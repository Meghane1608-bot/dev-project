import { useState, useEffect } from 'react';
import { ChevronLeft, Home, User, CreditCard, Calculator } from 'lucide-react';
import { fetchTransactions, createTransaction, deleteTransaction, fetchAccounts, fetchCategories } from './api';
import './components/dashboard.css';

export default function TransactionDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [accountsList, setAccountsList] = useState([]); // real accounts from the database
  const [accountId, setAccountId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [type, setType] = useState('Income');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('2026-08-19');
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');

  // Filter State
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterAccount, setFilterAccount] = useState('All');
  const [filterType, setFilterType] = useState('All');

  const [applied, setApplied] = useState(null); // null = no filters applied yet

  const handleApplyFilters = () => {
    setApplied({ fromDate, toDate, filterCategory, filterAccount, filterType });
  };

  const handleClearFilters = () => {
    setFromDate('');
    setToDate('');
    setFilterCategory('All');
    setFilterAccount('All');
    setFilterType('All');
    setApplied(null);
  };

  // The list the table actually shows based on filters
  const visibleTransactions = transactions.filter((t) => {
    if (!applied) return true;
    if (applied.fromDate && t.date < applied.fromDate) return false;
    if (applied.toDate && t.date > applied.toDate) return false;
    if (applied.filterCategory !== 'All' && t.category !== applied.filterCategory) return false;
    if (applied.filterAccount !== 'All' && t.account !== applied.filterAccount) return false;
    if (applied.filterType !== 'All' && t.type !== applied.filterType) return false;
    return true;
  });

    useEffect(() => {
    loadTransactions();
    loadAccounts();
    loadCategories();
  }, []);

  async function loadTransactions() {
    try {
      setLoading(true);
      const data = await fetchTransactions();
      setTransactions(data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }

  async function loadAccounts() {
    try {
      const data = await fetchAccounts();
      setAccountsList(data || []);
      if (data && data.length > 0) setAccountId(data[0].account_id);
    } catch (err) {
      console.error(err);
    }
  }
    async function loadCategories() {
    try {
      setCategoriesList((await fetchCategories()) || []);
    } catch (err) {
      console.error(err);
    }
  }

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
            await createTransaction({
        account_id: Number(accountId),
        category_id: Number(categoryId),
        amount: parseFloat(amount),
        transaction_date: date,
        description,
      });
      setAmount('');
      setDescription('');
      setShowAddForm(false);
      loadTransactions();
    } catch (err) {
      console.error(err);
      alert('Error creating transaction');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id);
        loadTransactions();
      } catch (err) {
        console.error(err);
        alert('Failed to delete transaction');
      }
    }
  };

  // Calculations
   const incomeTotal = transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const expenseTotal = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balanceTotal = incomeTotal - expenseTotal;

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-[#FEFBF0] text-stone-800 flex flex-col justify-between p-6">
        <div>
          <button 
            onClick={() => setShowAddForm(false)}
            className="flex items-center space-x-1 text-[#166534] hover:text-emerald-800 font-medium mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-4xl font-serif text-[#166534] font-semibold mb-6">Add transaction</h1>
        </div>

        <div className="max-w-2xl mx-auto w-full bg-white p-8 rounded-xl shadow-sm border border-stone-200 my-4">
          <form onSubmit={handleAddTransaction} className="space-y-5">
            <div>
              <label className="block text-xl font-serif text-[#166534] font-medium mb-2">
                Transaction Type:
              </label>
              <div className="flex space-x-6 items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="Income"
                    checked={type === 'Income'}
                    onChange={() => { setType('Income'); setCategoryId(''); }}
                    className="accent-[#166534] w-4 h-4"
                  />
                  <span className="font-bold text-stone-800">Income</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="Expense"
                    checked={type === 'Expense'}
                    onChange={() => { setType('Expense'); setCategoryId(''); }}
                    className="accent-[#166534] w-4 h-4"
                  />
                  <span className="font-bold text-stone-800">Expense</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#166534] mb-1">
                Amount (ZAR)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="500.00"
                required
                className="w-full bg-stone-200 border-none rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#166534] mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-stone-200 border-none rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#166534] mb-1">
                Accounts
              </label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full bg-stone-200 border-none rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#166534]"
              >
                {accountsList.map((a) => (
                  <option key={a.account_id} value={a.account_id}>{a.account_name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#166534] mb-1">
                Category
              </label>
                <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full bg-stone-200 border-none rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                >
                    <option value="">Select a category</option>
                    {categoriesList
                    .filter((c) => c.category_type === type.toLowerCase())
                    .map((c) => (
                    <option key={c.category_id} value={c.category_id}>{c.category_name}</option>
                    ))}
                </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#166534] mb-1">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mom/Allowance"
                className="w-full bg-stone-200 border-none rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-stone-300 text-stone-700 rounded hover:bg-stone-400 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-stone-300 text-stone-700 hover:bg-[#166534] hover:text-white rounded font-medium transition-colors"
              >
                Add transaction
              </button>
            </div>
          </form>
        </div>

        <BottomNavBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEFBF0] text-stone-800 flex flex-col justify-between p-6">
      <div className="grow max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-serif text-[#166534] font-semibold">
            Transaction Dashboard
          </h1>

          <button
            onClick={() => setShowAddForm(true)}
            className="w-12 h-12 bg-white rounded-xl shadow-sm border border-stone-200 flex items-center justify-center text-xl hover:bg-stone-50 transition-colors"
            title="Add Transaction"
          >
            📈
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-8">
          <div>
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full bg-[#EA580C] hover:bg-orange-600 text-white font-medium py-3 px-4 rounded shadow transition-colors text-center"
            >
              Add Transaction
            </button>
          </div>

          <div className="bg-[#E2E8F0] p-4 rounded text-center">
            <div className="font-serif text-lg text-stone-800 font-medium">Income</div>
            <div className="font-serif text-xl font-bold text-stone-900">
              R {incomeTotal.toLocaleString()}
            </div>
          </div>

          <div className="bg-[#E2E8F0] p-4 rounded text-center">
            <div className="font-serif text-lg text-stone-800 font-medium">Expenses</div>
            <div className="font-serif text-xl font-bold text-stone-900">
              R {expenseTotal.toLocaleString()}
            </div>
          </div>

          <div className="bg-[#E2E8F0] p-4 rounded text-center">
            <div className="font-serif text-lg text-stone-800 font-medium">Balance</div>
            <div className="font-serif text-xl font-bold text-stone-900">
              R {balanceTotal.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
          <div>
            <label className="block font-medium text-stone-700 mb-1">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full bg-[#E2E8F0] border-none rounded px-3 py-2 text-stone-800"
            />
          </div>

          <div>
            <label className="block font-medium text-stone-700 mb-1">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full bg-[#E2E8F0] border-none rounded px-3 py-2 text-stone-800"
            />
          </div>

          <div>
            <label className="block font-medium text-stone-700 mb-1">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-[#E2E8F0] border-none rounded px-3 py-2 text-stone-800"
            >
              <option value="All">All</option>
              {categoriesList.map((c) => (
              <option key={c.category_id} value={c.category_name}>{c.category_name}</option>
            ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-stone-700 mb-1">Account</label>
            <select
              value={filterAccount}
              onChange={(e) => setFilterAccount(e.target.value)}
              className="w-full bg-[#E2E8F0] border-none rounded px-3 py-2 text-stone-800"
            >
              <option value="All">All</option>
              {accountsList.map((a) => (
                <option key={a.account_id} value={a.account_name}>{a.account_name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="w-1/4">
            <label className="block font-medium text-stone-700 mb-1 text-sm">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-[#E2E8F0] border-none rounded px-3 py-2 text-stone-800 text-sm"
            >
              <option value="All">All</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleApplyFilters}
              className="bg-[#E2E8F0] hover:bg-stone-300 text-stone-800 font-medium px-4 py-2 rounded text-sm transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClearFilters}
              className="bg-[#E2E8F0] hover:bg-stone-300 text-stone-800 font-medium px-4 py-2 rounded text-sm transition-colors"
            >
              Clear Filters
            </button>
            <button className="bg-[#C7D2FE] hover:bg-indigo-200 text-indigo-950 font-medium px-4 py-2 rounded text-sm border border-indigo-300 transition-colors">
              View categories
            </button>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-serif text-stone-900 font-bold text-center mb-6">
            Transactions
          </h2>

          {loading ? (
            <div className="text-center py-8 text-stone-500">Loading transactions...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto bg-white/40 rounded-xl p-4 border border-stone-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-300 text-stone-900 font-serif text-lg">
                    <th className="py-3 px-4 font-bold">Date</th>
                    <th className="py-3 px-4 font-bold">Description</th>
                    <th className="py-3 px-4 font-bold">Category</th>
                    <th className="py-3 px-4 font-bold">Account</th>
                    <th className="py-3 px-4 font-bold text-right">Amount</th>
                    <th className="py-3 px-4 font-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-sm text-stone-800">
                  {visibleTransactions.map((t) => (
                    <tr key={t.id || t._id} className="hover:bg-stone-100/50">
                      <td className="py-3 px-4">{t.date}</td>
                      <td className="py-3 px-4 font-medium">{t.description}</td>
                      <td className="py-3 px-4">{t.category}</td>
                      <td className="py-3 px-4">{t.account}</td>
                      <td className="py-3 px-4 text-right font-medium">
                        R {Math.abs(t.amount).toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="p-1 hover:bg-stone-200 rounded text-stone-700" title="View">
                            👁️
                          </button>
                          <button className="p-1 hover:bg-stone-200 rounded text-stone-700" title="Edit">
                            ✏️
                          </button>
                          <button onClick={() => handleDelete(t.id || t._id)} className="p-1 hover:bg-stone-200 rounded text-red-600" title="Delete">
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
}

function BottomNavBar() {
  return (
    <nav className="bottom-nav">
      <button type="button" className="nav-icon-btn">
        <Home className="nav-icon" />
      </button>
      <button type="button" className="nav-icon-btn">
        <User className="nav-icon" />
      </button>
      <button type="button" className="nav-icon-btn">
        <CreditCard className="nav-icon" />
      </button>
      <button type="button" className="nav-icon-btn">
        <Calculator className="nav-icon" />
      </button>
    </nav>
  );
}