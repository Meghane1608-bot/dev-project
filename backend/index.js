import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Flexible CORS configuration for development
app.use(express.json());

// Root Endpoint GET / - Test SQLite Connection
app.get('/', async (req, res) => {
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

    // Transaction API ROUTES

    // GET: Fetch all transactions
    app.get('/transactions', (req, res) => {
      db.all('SELECT * FROM transactions', [], (err, rows) => {
        if (err) {
          console.error('Error fetching transactions:', err.message);
          return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
        res.json(rows);
      });
    });

    // POST: Add a new transaction
    app.post('/transactions', (req, res) => {
      const { amount, category, date, description } = req.body;
      const query = 'INSERT INTO transactions (amount, category, date, description) VALUES (?, ?, ?, ?)';
      db.run(query, [amount, category, date, description], function(err) {
        if (err) {
          console.error('Error adding transaction:', err.message);
          return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
        res.json({ status: 'success', message: 'Transaction added successfully!', transactionId: this.lastID });
      });
    });

    // DELETE: Remove a transaction by ID
    app.delete('/transactions/:id', (req, res) => {
      const { id } = req.params;
      const query = 'DELETE FROM transactions WHERE id = ?';
      db.run(query, [id], function(err) {
        if (err) {
          console.error('Error deleting transaction:', err.message);
          return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
        if (this.changes === 0) {
          return res.status(404).json({ status: 'error', message: 'Transaction not found' });
        }
        res.json({ status: 'success', message: 'Transaction deleted successfully!' });
      });
    });

  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});