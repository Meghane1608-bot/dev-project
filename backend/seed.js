import db from './db.js';

const seedDatabase = () => {
    try {
        console.log('Seeding database with initial data...');

        // Clear existing tables in correct order to avoid foreign key constraints
        db.exec(`
            DELETE FROM transactions;
            DELETE FROM savings_goals;
            DELETE FROM categories;
            DELETE FROM accounts;
            DELETE FROM users;
        `);

        // 1. Seed Users
        const insertUser = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
        insertUser.run('john_doe', 'password123');
        insertUser.run('jane_smith', 'password456');
        console.log('Users seeded successfully.');

        // 2. Seed Accounts
        const insertAccount = db.prepare(`
            INSERT INTO accounts (user_id, account_number, account_type, balance, overdraft_limit) 
            VALUES (?, ?, ?, ?, ?)
        `);
        insertAccount.run(1, 'ACC-001', 'current', 1000.00, 500.00);
        insertAccount.run(1, 'ACC-002', 'savings', 5000.00, 0.00);
        insertAccount.run(2, 'ACC-003', 'current', 2000.00, 1000.00);
        console.log('Accounts seeded successfully.');

        // 3. Seed Categories
        const insertCategory = db.prepare('INSERT INTO categories (category_type, category_name) VALUES (?, ?)');
        insertCategory.run('income', 'Salary');
        insertCategory.run('income', 'Freelance');
        insertCategory.run('expense', 'Groceries');
        insertCategory.run('expense', 'Utilities');
        console.log('Categories seeded successfully.');

        // 4. Seed Transactions (matching your table schema: account_id, category_id, limit_amount, period)
        const insertTransaction = db.prepare(`
            INSERT INTO transactions (account_id, category_id, limit_amount, period) 
            VALUES (?, ?, ?, ?)
        `);
        insertTransaction.run(1, 1, 3000.00, 'monthly');
        insertTransaction.run(1, 3, 150.00, 'monthly');
        insertTransaction.run(2, 2, 1500.00, 'monthly');
        console.log('Transactions seeded successfully.');

        // 5. Seed Savings Goals
        const insertGoal = db.prepare(`
            INSERT INTO savings_goals (account_id, goal_name, target_amount) 
            VALUES (?, ?, ?)
        `);
        insertGoal.run(2, 'Emergency Fund', 10000.00);
        console.log('Savings goals seeded successfully.');

        console.log('Database seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error.message);
    }
};

seedDatabase();

export default seedDatabase;