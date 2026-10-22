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
app.get('/budgets', (req, res) => {
  db.all('SELECT * FROM budgets', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/budgets', (req, res) => {
  const { user_id, category_id, budget_amount, start_date, end_date } = req.body;
  const query = 'INSERT INTO budgets (user_id, category_id, budget_amount, start_date, end_date) VALUES (?, ?, ?, ?, ?)';
  db.run(query, [user_id || 1, category_id, budget_amount, start_date, end_date], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ status: 'success', budgetId: this.lastID });
  });
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

// ================= TRANSACTIONS API =================
app.get('/transactions', (req, res) => {
  db.all('SELECT * FROM transactions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/transactions', (req, res) => {
  const { user_id, account_id, category_id, amount, transaction_date, description } = req.body;
  const query = 'INSERT INTO transactions (user_id, account_id, category_id, amount, transaction_date, description) VALUES (?, ?, ?, ?, ?, ?)';
  db.run(query, [user_id || 1, account_id, category_id, amount, transaction_date, description], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ status: 'success', transactionId: this.lastID });
  });
});

app.delete('/transactions/:id', (req, res) => {
  db.run('DELETE FROM transactions WHERE transaction_id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ status: 'success', message: 'Transaction deleted' });
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