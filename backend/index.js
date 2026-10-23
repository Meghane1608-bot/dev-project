import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});