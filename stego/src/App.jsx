import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  const [summary, setSummary] = useState({ income: 0, expenses: 0, net_balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('');

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    account_id: 1, // 1 = Current Account, 2 = Savings Account
    category_id: 2, // Default category
    transaction_date: new Date().toISOString().split('T')[0],
    amount: '',
    description: '',
    type: 'expense'
  });

  // Fetch transactions and summary from backend
  const loadData = async () => {
    try {
      setLoading(true);
      const query = selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : '';
      const res = await fetch(`${API_BASE}/transactions${query}`);
      if (!res.ok) throw new Error('Failed to fetch transactions');
      
      const data = await res.json();
      setSummary(data.summary);
      setTransactions(data.transactions);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const numericAmount = parseFloat(formData.amount);
      const finalAmount = formData.type === 'expense' ? -Math.abs(numericAmount) : Math.abs(numericAmount);

      const res = await fetch(`${API_BASE}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          account_id: Number(formData.account_id),
          category_id: Number(formData.category_id),
          transaction_date: formData.transaction_date,
          amount: finalAmount,
          description: formData.description
        }),
      });

      if (!res.ok) throw new Error('Failed to save transaction');

      setShowForm(false);
      setFormData({
        account_id: 1,
        category_id: 2,
        transaction_date: new Date().toISOString().split('T')[0],
        amount: '',
        description: '',
        type: 'expense'
      });
      loadData();
    } catch (err) {
      alert('Error saving transaction: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        const res = await fetch(`${API_BASE}/transactions/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete transaction');
        loadData();
      } catch (err) {
        alert('Error deleting transaction: ' + err.message);
      }
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Navbar Header */}
      <header style={{ background: '#004d40', color: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>stégo Personal Finance</h1>
        <span style={{ fontSize: '14px', opacity: 0.8 }}>Student Dashboard</span>
      </header>

      <main style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 20px' }}>
        <h2>Transaction Dashboard</h2>

        {/* Summary Metrics Cards */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
          <div style={{ flex: 1, padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '5px solid #2e7d32' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Total Income</h4>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#2e7d32' }}>R {summary.income.toFixed(2)}</p>
          </div>
          <div style={{ flex: 1, padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '5px solid #c62828' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Total Expenses</h4>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#c62828' }}>R {summary.expenses.toFixed(2)}</p>
          </div>
          <div style={{ flex: 1, padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '5px solid #1565c0' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Net Balance</h4>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: summary.net_balance >= 0 ? '#2e7d32' : '#c62828' }}>
              R {summary.net_balance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Action Bar & Filter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button 
            onClick={() => setShowForm(!showForm)} 
            style={{ padding: '10px 20px', background: '#004d40', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {showForm ? 'Close Form' : '+ Add Transaction'}
          </button>

          <div>
            <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">All Categories</option>
              <option value="Allowance/Stipend">Allowance/Stipend</option>
              <option value="Groceries">Groceries</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Transport">Transport</option>
            </select>
          </div>
        </div>

        {/* Add Transaction Form */}
        {showForm && (
          <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '25px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0 }}>Record New Transaction</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Type:</label>
                <select name="type" value={formData.type} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Account:</label>
                <select name="account_id" value={formData.account_id} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                  <option value={1}>Current Account (****4588)</option>
                  <option value={2}>Savings Account (****5234)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
                <select name="category_id" value={formData.category_id} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                  <option value={1}>Allowance/Stipend</option>
                  <option value={2}>Groceries</option>
                  <option value={3}>Entertainment</option>
                  <option value={4}>Transport</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Date:</label>
                <input type="date" name="transaction_date" value={formData.transaction_date} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Amount (ZAR):</label>
                <input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
                <input type="text" name="description" value={formData.description} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
            </div>
            <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Save Transaction
            </button>
          </form>
        )}

        {/* Transactions Table */}
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
                <th style={{ padding: '12px 15px' }}>Date</th>
                <th style={{ padding: '12px 15px' }}>Description</th>
                <th style={{ padding: '12px 15px' }}>Category</th>
                <th style={{ padding: '12px 15px' }}>Account</th>
                <th style={{ padding: '12px 15px' }}>Amount</th>
                <th style={{ padding: '12px 15px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center' }}>Loading transactions...</td></tr>
              ) : error ? (
                <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: 'red' }}>{error}</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center' }}>No transactions recorded.</td></tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.transaction_id} style={{ borderBottom: '1px solid #f1f3f5' }}>
                    <td style={{ padding: '12px 15px' }}>{tx.transaction_date}</td>
                    <td style={{ padding: '12px 15px' }}>{tx.description}</td>
                    <td style={{ padding: '12px 15px' }}>{tx.category_name}</td>
                    <td style={{ padding: '12px 15px' }}>{tx.account_number}</td>
                    <td style={{ padding: '12px 15px', color: tx.amount < 0 ? '#c62828' : '#2e7d32', fontWeight: 'bold' }}>
                      R {Math.abs(tx.amount).toFixed(2)}
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      <button onClick={() => handleDelete(tx.transaction_id)} style={{ padding: '5px 10px', background: '#e53935', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
