import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//small wrappers so sqlite can used with async/await
const dbRun= (sql,params =[]) =>
  new Promise((resolve,reject)=> {
    db.run(sql,params, function(err) {
      if (err) reject(err);
      else resolve({lastID: this.lastID, changes: this.changes});
    });
  });

  const dbGet = (sql,params =[]) =>
    new Promise((resolve,reject) => {
      db.get(sql,params,(err,row) => (err ? reject(err) : resolve(row)));
    });

  const dbAll =(sql,params =[]) =>
    new Promise((resolve,reject) => {
      db.all(sql,params, (err,rows) => (err ? reject(err) : resolve(rows)));
    });

    //find the category , and if it doesnt exist yet create it
    const findOrCreateCategory = async(name,type) => {
      const existing = await dbGet(
        'SELECT category_id FROM categories WHERE category_name =? AND category_type=?',
        [name,type]
      );
      if (existing) return existing.category_id;
      const created = await dbRun(
        'INSERT INTO categories (category_type, category_name) VALUES (?,?)',
        [type,name]
      );
      return created.lastID;
    };

    const months= [
      'January','February','March','April','May', 'June',
      'July', 'August','September', 'October','November','December'
    ];

// Root Endpoint GET / - Test SQLite Connection
app.get('/', (req, res) => {
  db.get("SELECT 'SQLite connection successful!' AS db_status, datetime('now') AS server_time", (err, row) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
    res.json({
      status: 'success',
      message: 'Welcome to the Stego Backend API!',
      database: row,
    });
  });
});

// ================= USERS API =================

// GET: Fetch all users
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// ================= ACCOUNTS API =================
app.get('/accounts', async (req, res, next) => {
  try{
    //only this users accounts
    const rows = await dbAll('SELECT * FROM accounts WHERE user_id=?',[1]);
    res.json(rows);
  }
  catch (error) {
    next(error);
  }
});

app.post('/accounts', async (req, res, next) => {
  const { user_id, account_name, account_type, balance, overdraft_limits } = req.body;

  if(!account_name|| !account_type) {
    return res.status(400).json({error:'account_name and account_type are required'})
  }

  try{
    const result = await dbRun(
      'INSERT INTO accounts (user_id, account_name, account_type, balance, overdraft_limits) VALUES (?, ?, ?, ?, ?)',
      [user_id || 1, account_name, account_type, balance || 0, overdraft_limits || 0]
    );
    res.status(201).json({status: 'success' , accountId:result.lastID});
  }
  catch(error) {
    next(error);
  }
});

app.delete('/accounts/:id', (req, res) => {
  db.run('DELETE FROM accounts WHERE account_id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Account not found' });
    res.json({ status: 'success', message: 'Account deleted' });
  });
});

// ================= BUDGETS API =================
app.get('/budgets', async (req, res, next) => {
  const query =`SELECT b.budget_id, b.budget_amount , b.start_date,c.category_name , c.category_type
  FROM budgets b
  JOIN categories c ON b.category_id =c.category_id
  WHERE b.user_id = ?
  ORDER BY b.budget_id`;
  try {
    const rows= await dbAll(query,[1]);
    //group the rows into one budget per month
    const grouped ={};
    rows.forEach((row) => {
      if (!grouped[row.start_date]){
        const monthNumber = Number(row.start_date.slice(5,7));
        grouped[row.start_date] = {id:row.start_date,period:months[monthNumber-1], items:[]};
      }
      const isIncome = row.category_type === 'income';
      grouped[row.start_date].items.push({
        categoryName: row.category_name,
        categoryType: isIncome ? 'Income': 'Expenditure',
        expectedIncome: isIncome ? row.budget_amount:0,
        limitAmount: isIncome ? 0: row.budget_amount,
      });
    });
    res.json(Object.values(grouped)) //most recently saved
  }catch(error){
    next(error);
  }
});

app.post('/budgets', async (req, res, next) => {
  const { user_id, period, items } = req.body;
  const userId = user_id|| 1;
  
  if (!period || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json( {error: 'period and items are required'})
  }
  const monthIndex = months.indexOf(period);
  if (monthIndex===-1) {
    return res.status(400).json({error:'Invalid budget period'})
  }

  //turn the month name into start and end dates 
  const year= new Date().getFullYear();
  const monthNumber = String(monthIndex+1).padStart(2,'0');
  const lastDay = new Date(year, monthIndex +1, 0).getDate();
  const start_date= `${year}-${monthNumber}-01`;
  const end_date= `${year}-${monthNumber}-${lastDay}`;

  try {
    for (const item of items) {
      const isIncome = item.categoryType === 'Income';
      const category_id = await findOrCreateCategory(item.categoryName, isIncome ? 'income': 'expense');
      const budget_amount = isIncome ? item.expectedIncome: item.limitAmount;
      await dbRun(
  'INSERT INTO budgets (user_id, category_id, budget_amount, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
        [userId, category_id,budget_amount,start_date,end_date]
      )
    }
    //send back period and items so budgetSetup can pass it to budgetDashboard
    res.status(201).json({status:'success', period, items});
  }catch(error) {
    next(error);
  }
});

app.delete('/budgets/:id', (req, res) => {
  db.run('DELETE FROM budgets WHERE budget_id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Budget not found' });
    res.json({ status: 'success', message: 'Budget deleted' });
  });
});

// ================= CATEGORIES API =================
app.get('/categories', (req, res) => {
  db.all('SELECT * FROM categories', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/categories', (req, res) => {
  const { category_type, category_name } = req.body;
  const query = 'INSERT INTO categories (category_type, category_name) VALUES (?, ?)';
  db.run(query, [category_type, category_name], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ status: 'success', categoryId: this.lastID });
  });
});

app.delete('/categories/:id', (req, res) => {
  db.run('DELETE FROM categories WHERE category_id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Category not found' });
    res.json({ status: 'success', message: 'Category deleted' });
  });
});



// ================= USERS API =================

// GET: Fetch all users
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// ================= ACCOUNTS API =================
app.get('/accounts', (req, res) => {
  db.all('SELECT * FROM accounts', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/accounts', (req, res) => {
  const { user_id, account_name, account_type, balance, overdraft_limits } = req.body;
  const query = 'INSERT INTO accounts (user_id, account_name, account_type, balance, overdraft_limits) VALUES (?, ?, ?, ?, ?)';
  db.run(query, [user_id || 1, account_name, account_type, balance || 0, overdraft_limits || 0], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ status: 'success', accountId: this.lastID });
  });
});

app.delete('/accounts/:id', (req, res) => {
  db.run('DELETE FROM accounts WHERE account_id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Account not found' });
    res.json({ status: 'success', message: 'Account deleted' });
  });
});


// ================= TRANSACTIONS API =================
app.get('/transactions', (req, res) => {
  const query = `
    SELECT t.transaction_id   AS id,
           t.transaction_date AS date,
           t.amount, t.description,
           t.account_id, t.category_id,
           a.account_name     AS account,
           c.category_name    AS category,
           CASE c.category_type WHEN 'income' THEN 'Income' ELSE 'Expense' END AS type
    FROM transactions t
    JOIN accounts   a ON a.account_id  = t.account_id
    JOIN categories c ON c.category_id = t.category_id
    ORDER BY t.transaction_date DESC`;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

//middleware for requests to routes that dont exist
const unknownEndpoint = (req,res) => {
  res.status(404).json({error: 'unknown endpoint'});
};
app.use(unknownEndpoint);

//error handler, any route that calls next(error) ends up here
const errorHandler =(error,req, res, next) => {
  console.error(error.message);
  res.status(500).json({error: error.message});
};
app.use(errorHandler);


// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});