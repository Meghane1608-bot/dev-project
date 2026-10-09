import  Database  from 'better-sqlite3';

// Creates or opens 'stego.sqlite' in your backend directory
const db = new Database('stego.sqlite');

// Enable Write-Ahead Logging (WAL) and foreign keys
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON')

// Initialize database schema based on the stego ERD
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS accounts (
    account_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(user_id),
    account_number TEXT NOT NULL,
    account_type TEXT CHECK(account_type IN ('current', 'savings')) NOT NULL,
    balance REAL DEFAULT 0.00,
    data_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    overdraft_limit REAL DEFAULT 0.00,
    withdrawl_limit REAL DEFAULT 0.00,
    goal_amount REAL DEFAULT 0.00,
    withdrawls_this_period INTEGER DEFAULT 0
    );

CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_type TEXT CHECK(category_type IN ('income', 'expense')) NOT NULL,
    category_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER NOT NULL REFERNCES accounts(account_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(category_id),
    limit_amount REAL NOT NULL,
    period TEXT DEFAULT 'monthly'
)

CREATE TABLE IF NOT EXISTS savings_goals (
    goal_id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER REFERENCES accounts(account_id),
    goal_name TEXT NOT NULL,
    target_amount REAL NOT NULL
);
');