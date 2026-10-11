import React, {useState} from "react";
import {createTransaction} from "../api/transaction";

export default function TransactionForm({ onTransactionCreated, onCancel }) {
    const [formData, setFormData] = useState({
        type: 'expense',
        account_id: 1, // 1 = Current, 2 = Savings
        category_id: 2, // Default category ID, you can change it as needed
        amount: '',
        transaction_date: new Date().toISOString().split('T')[0], // Default to today's date
        description: '',
    }); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const rawAmount = parseFloat(formData.amount);
            const finalAmount = formData.type === 'expense' ? -Math.abs(rawAmount) : Math.abs(rawAmount);

        await createTransaction({
            account_id: Number(formData.account_id),
            category_id: Number(formData.category_id),
            amount: finalAmount,
            transaction_date: formData.transaction_date,
            description: formData.description,
        });

        onTransactionAdded(); // Notify parent component to refresh the transaction list
    } catch (error) {
        alert('Failed to create transaction: ' + error.message);
    }
};

return (
    <div style={{ background: '#ffffff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '0 auto 30px' }}>
      <h3 style={{ marginTop: 0, color: '#004d40' }}>Add Transaction</h3>
      
      <form onSubmit={handleSubmit}>
        {/* Transaction Type Radio Options */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', marginRight: '15px' }}>Transaction Type:</label>
          <label style={{ marginRight: '15px' }}>
            <input type="radio" name="type" value="income" checked={formData.type === 'income'} onChange={handleChange} /> Income
          </label>
          <label>
            <input type="radio" name="type" value="expense" checked={formData.type === 'expense'} onChange={handleChange} /> Expense
          </label>
        </div>

        {/* Amount */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Amount (ZAR):</label>
          <input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} required placeholder="0.00" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        {/* Date */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Date:</label>
          <input type="date" name="transaction_date" value={formData.transaction_date} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        {/* Account Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Account:</label>
          <select name="account_id" value={formData.account_id} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value={1}>Current Account (****4588)</option>
            <option value={2}>Savings Account (****5234)</option>
          </select>
        </div>

        {/* Category Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
          <select name="category_id" value={formData.category_id} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value={1}>Allowance / Stipend</option>
            <option value={2}>Groceries</option>
            <option value={3}>Entertainment</option>
            <option value={4}>Transport</option>
          </select>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="e.g. Checkers, Uber, Stipend" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ padding: '10px 20px', background: '#004d40', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Save Transaction
          </button>
          <button type="button" onClick={onCancel} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}