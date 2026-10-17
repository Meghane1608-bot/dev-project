const API_BASE = 'http://localhost:5000/api';

// --- Transactions ---
export async function fetchTransactions() {
  const res = await fetch(`${API_BASE}/transactions`);
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

export async function createTransaction(transactionData) {
  const res = await fetch(`${API_BASE}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transactionData),
  });
  if (!res.ok) throw new Error('Failed to create transaction');
  return res.json();
}

export async function deleteTransaction(id) {
  const res = await fetch(`${API_BASE}/transactions/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete transaction');
  return res.json();
}

// --- Categories ---
export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

// --- Accounts ---
export async function fetchAccounts() {
  const res = await fetch(`${API_BASE}/accounts`);
  if (!res.ok) throw new Error('Failed to fetch accounts');
  return res.json();
}

// --- Budgets & Savings Goals ---
export async function fetchBudgets() {
  const res = await fetch(`${API_BASE}/budgets`);
  if (!res.ok) throw new Error('Failed to fetch budgets');
  return res.json();
}

export async function fetchSavingsGoals() {
  const res = await fetch(`${API_BASE}/savings-goals`);
  if (!res.ok) throw new Error('Failed to fetch savings goals');
  return res.json();
}