import db from './db.js';

const seedDatabase = async () => {
    db.serialize(() => {
        console.log('Seeding database with initial data...');

        // Clear existing tables before seeding (in reverse order of foreign keys)
        db.run('DELETE FROM transactions');
        db.run('DELETE FROM budgets');
        db.run('DELETE FROM categories');
        db.run('DELETE FROM accounts');
        db.run('DELETE FROM users');
        db.run('DELETE from users');
        db.run('DELETE FROM sqlite_sequence');

        // 0. Seed Users (Including email and password to satisfy NOT NULL constraints)
        db.run(`INSERT INTO users (username, email, password) VALUES 
            ('john_doe', 'john.doe@example.com', 'password123'),
            ('jane_smith', 'jane.smith@example.com', 'password456')`, (err) => {
            if (err) {
                console.error('Error seeding users:', err.message);
            } else {
                console.log('Users seeded successfully.');
            }
        });

        // 1. Seed Accounts
        db.run(`INSERT INTO accounts (user_id, account_name, account_type, balance, overdraft_limits) VALUES
            (1, 'Current Account', 'current', 1000.00, 500.00), 
            (1, 'Savings Account', 'savings', 5000.00, 0.00),
            (2, 'Business Account', 'business', 2000.00, 1000.00)`, (err) => {
            if (err) {
                console.error('Error seeding accounts:', err.message);
            } else {
                console.log('Accounts seeded successfully.');
            }
        });

        // 2. Seed Categories
        db.run(`INSERT INTO categories (category_type, category_name) VALUES
            ('income', 'Salary'),
            ('income', 'Bursary stipend'),
            ('expense', 'Groceries'),
            ('expense', 'Transport'),
            ('expense', 'Entertainment'),
            ('income', 'NSFAS')`,  (err) => {
            if (err) {
                console.error('Error seeding categories:', err.message);
            } else {
                console.log('Categories seeded successfully.');
            }
        });

        // 3. Seed Budgets
        db.run(`INSERT INTO budgets (user_id, category_id, budget_amount, start_date, end_date) VALUES
            (1, 1, 3000.00, '2024-01-01', '2024-01-31'),
            (1, 3, 500.00, '2024-01-01', '2024-01-31'),
            (2, 2, 1500.00, '2024-01-01', '2024-01-31')`, (err) => {
            if (err) {
                console.error('Error seeding budgets:', err.message);
            } else {
                console.log('Budgets seeded successfully.');
            }
        });

        // 4. Seed Transactions
        //expenses should be stored as negative amnts so dashboard can tell inc from exp
        db.run(`INSERT INTO transactions (user_id, account_id, category_id, amount, transaction_date, description) VALUES
            (1, 1, 1, 3000.00, '2024-01-15', 'January Salary'),
            (1, 1, 3, -150.00, '2024-01-20', 'Grocery Shopping'),
            (2, 2, 2, 1500.00, '2024-01-10', 'Bursary stipend payment')`, (err) => {
            if (err) {
                console.error('Error seeding transactions:', err.message);
            } else {
                console.log('Transactions seeded successfully.');
            }
        });
    });
};

// Call the function to seed the database when this script is run
seedDatabase();

export default seedDatabase;