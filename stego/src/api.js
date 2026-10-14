const API_BASE = 'https://expert-acorn-69pj69r74wv62rgjj-5000.app.github.dev/api';

export async function fetchTransactions(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_BASE}/transactions${params ? `?${params}` : ''}`);
    if (!res.ok) throw new Error('Failed to load transactions');
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