import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TransactionDashboard from './components/TransactionDashboard';
import BudgetDashboard from './components/Budgetdashboard';
import CategoriesOverview from './components/CategoriesOverview';
import BudgetSetup from './BudgetSetup';
import Category from './Category.jsx';
import Overview from './Overview.jsx';
import AddAccount from './AddAccount';
import AccountDashboard from './AccountDashboard';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FEFBF0] pb-20">
        
        {/* Main Route Views */}
        <Routes>
          <Route path="/" element={<TransactionDashboard />} />
          <Route path="/transactions" element={<TransactionDashboard />} />
          <Route path="/budgets" element={<BudgetDashboard />} />
          <Route path="/categories" element={<CategoriesOverview />} />
          <Route path="/CreateAccount" element={<AddAccount />} />
          <Route path="/Home" element={<AccountDashboard />} />
          <Route path="/BudgetSetup" element={<BudgetSetup />} />
          <Route path="/BudgetDashboard" element={<BudgetDashboard />} />
          <Route path="/category" element={<Category />} />
          <Route path="/overview" element={<Overview />} />
        </Routes>

        <nav className="bottom-nav fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 shadow-lg z-50">
          <Link to="/transactions" className="nav-icon-btn flex flex-col items-center text-xs text-gray-600 hover:text-black">
            <span>Transactions</span>
          </Link>
          <Link to="/budgets" className="nav-icon-btn flex flex-col items-center text-xs text-gray-600 hover:text-black">
            <span>Budgets</span>
          </Link>
          <Link to="/categories" className="nav-icon-btn flex flex-col items-center text-xs text-gray-600 hover:text-black">
            <span>Categories</span>
          </Link>
        </nav>

      </div>
    </Router>
  );
}
