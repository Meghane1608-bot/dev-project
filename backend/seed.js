import db from './db.js';

const seedDatabase = async () => {
    console.log('Seeding database...');

// Insert User

db.prepare("INSERT OR IGNORE INTO users(user_id, username, email) VALUES(1, 'Student User', 'student@stego.co.za')").run();

// Insert default accounts
const insertAccount = db.prepare('INSERT OR IGNORE INTO accounts(account_id, user_id, account_name, account_type, balance, overdraft_limits) VALUES(?, ?, ?, ?)');
insertAccount.run(1, 1, '****4588', 'Current', 5000.00, 1000.00);
insertAccount.run(2, 1, '****4589', 'Savings', 1000.00, 0.00);

//Insert default categories
const insertCategory = db.prepare('INSERT OR IGNORE INTO categories(category_id, category_type, category_name) VALUES(?, ?, ?)');
insertCategory.run(1, 'income', 'Allowance/Stipend');
insertCategory.run(2, 'expense', 'Utilities');
insertCategory.run(3, 'expense', 'Entertainment');
insertCategory.run(4, 'expense', 'Transport');

//Insert sample budget
const insertBudget = db.prepare('INSERT OR IGNORE INTO budgets(budget_id, user_id, category_id, budget_amount, start_date, end_date) VALUES(?, ?, ?, ?, ?, ?)');
insertBudget.run(1, 1, 2, 500.00, '2024-01-01', '2024-01-31');
insertBudget.run(2, 1, 3, 300.00, '2024-01-01', '2024-01-31');
insertBudget.run(3, 1, 4, 200.00, '2024-01-01', '2024-01-31');

//Insert savings goal
const insertSavingsGoal = db.prepare('INSERT OR IGNORE INTO savings_goals(goal_id, user_id, goal_name, target_amount, current_amount, target_date) VALUES(?, ?, ?, ?, ?, ?)');
insertSavingsGoal.run(1, 1, 'Emergency Fund', 1000.00, 200.00, '2024-12-31');

console.log('Database seeded successfully.');
}

seedDatabase();


