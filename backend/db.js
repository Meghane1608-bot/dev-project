import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to SQLite database (creates stego.sqlite automatically if it doesn't exist)
const dbPath = path.resolve(__dirname, 'stego.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables safely using serialization
db.serialize(() => {
  // Enable foreign key constraints in SQLite
  db.run('PRAGMA foreign_keys = ON');

  // 0. Users Table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created or already exists.');
    }
  });

  // 1. Accounts Table
  db.run(`CREATE TABLE IF NOT EXISTS accounts (
    account_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    account_name TEXT NOT NULL,
    account_type TEXT NOT NULL,
    balance REAL NOT NULL DEFAULT 0.0,
    overdraft_limits REAL NOT NULL DEFAULT 0.0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
  )`, (err) => {
    if (err) {
      console.error('Error creating accounts table:', err.message);
    } else {
      console.log('Accounts table created or already exists.');
    }
  });

  // 2. Categories Table
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_type TEXT NOT NULL CHECK(category_type IN ('income', 'expense')),
    category_name TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error('Error creating categories table:', err.message);
    } else {
      console.log('Categories table created or already exists.');
    }
  });
});

// 3. Budgets Table
db.run(`CREATE TABLE IF NOT EXISTS budgets (
  budget_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  budget_amount REAL NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
)`, (err) => {
  if (err) {
    console.error('Error creating budgets table:', err.message);
  } else {
    console.log('Budgets table created or already exists.');
  }
});

// 4. Transactions Table
db.run(`CREATE TABLE IF NOT EXISTS transactions (
  transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  account_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  transaction_date TEXT NOT NULL,
  description TEXT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
)`, (err) => {
  if (err) {
    console.error('Error creating transactions table:', err.message);
  } else {
    console.log('Transactions table created or already exists.');
  }
});

export default db;