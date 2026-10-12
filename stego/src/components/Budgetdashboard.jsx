import React, { useState, useEffect } from "react";
import { fetchBudgets, fetchSavingsGoals } from "../api";

export default function BudgetDashboard() {
  const [budgets, setBudgets] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    Promise.all([fetchBudgets(), fetchSavingsGoals()])
      .then(([budgetsData, savingsGoalsData]) => {
        setBudgets(budgetsData);
        setSavingsGoals(savingsGoalsData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

    return (
        <div style={{ background: '#ffffff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginTop: 0, color: '#004d40' }}>Budget Dashboard</h2>
            {loading ? (
                <p>Loading budgets and savings goals...</p>
            ) : (
                <>
                    <h3 style={{ color: '#00796b' }}>Budgets</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Budget ID</th>
                                <th style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Budget Name</th>
                                <th style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {budgets.map((budget) => (
                                <tr key={budget.id}>
                                    <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{budget.id}</td>
                                    <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{budget.name}</td>
                                    <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>${budget.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3 style={{ color: '#00796b' }}>Savings Goals</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Goal ID</th>
                                <th style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Goal Name</th>
                                <th style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Target Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {savingsGoals.map((goal) => (
                                <tr key={goal.id}>
                                    <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{goal.id}</td>
                                    <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{goal.name}</td>
                                    <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>${goal.targetAmount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}  