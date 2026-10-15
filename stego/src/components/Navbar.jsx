export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
   { id: 'transactions', label: 'Transactions' },
   { id: 'accounts', label: 'Accounts' },
   { id: 'categories', label: 'Categories' },
   { id: 'budgets', label: 'Budgets & Savings' }
  ];

  return (
    <header className="bg-emerald-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold tracking-tight">
            stégo <span className="text-emerald-400 font-light text-xl">Personal Finance</span>
          </h1>
        </div>
        <div className="text-xs font-medium bg-emerald-800 text-emerald-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
          Student Dashboard
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-6 flex space-x-2 border-t border-emerald-800 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-200 hover:bg-emerald-800 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}