import React from "react";

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { name: 'accounts', label: 'Accounts' },
    { name: 'transactions', label: 'Transactions' },
    { name: 'categories', label: 'Categories' },
    { name: 'budgets', label: 'Budgets & Savings' },
  ];

return (
    <nav style={{ background: '#00332c', padding: '0 30px', display: 'flex', alignItems: 'center', height: '60px' }}>
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => setActiveTab(item.name)}
          style={{
            background: activeTab === item.name ? '#006655' : 'none',
            color: 'white',
            border: 'none',
            borderBottom: activeTab === item.name ? '2px solid #00ffcc' : 'none',
            padding: '10px 20px',
            margin: '0 5px',
            fontWeight: activeTab === item.name ? 'bold' : 'normal',
            cursor: 'pointer',
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}