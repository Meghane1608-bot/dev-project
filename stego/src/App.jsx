import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TransactionDashboard from './TransactionDashboard';
import BudgetDashboard from './components/Budgetdashboard';
import CategoriesOverview from './components/CategoriesOverview';
import BudgetSetup from './BudgetSetup';
import Category from './Category.jsx';
import Overview from './Overview.jsx';
import AddAccount from './AddAccount';
import AccountDashboard from './AccountDashboard';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionDashboard from './components/transactiondashboard';
import BudgetSummary from './components/Budgetdashboard';
import CategoriesOverview from './components/CategoriesOverview';
import BudgetSetup from './BudgetSetup';
import BudgetDashboard from './BudgetDashboard';
import Category from './Category.jsx';
import Overview from './Overview.jsx';
import Login from './Login.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import AccountDashboard from './AccountDashboard.jsx';
import AddAccount from './AddAccount.jsx';
import Savings from './Savings.jsx';
import './App.css'; // Import your CSS file for styling


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FEFBF0] pb-20">
        
        {/* Main Route Views */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/budgetSetup" element={<BudgetSetup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* budget dashboard route */}
          <Route path="/BudgetDashboard" element={<BudgetDashboard />} />

          {/* Category and overview routes */}
          <Route path="/category" element={<Category />} />
          <Route path="/overview" element={<Overview />} />

          {/* Account and Savings routes */}
          <Route path="/accountdashboard" element={<AccountDashboard />} />
          <Route path="/addaccount" element={<AddAccount />} />
          <Route path="/savings" element={<Savings />} />

          
          <Route path="/CreateAccount" element={<AddAccount />} />
          <Route path="/Home" element={<AccountDashboard />} />

          {/* Daanyaal's screen */}
          <Route path="/transactions" element={<TransactionDashboard />} />

          <Route path="/budgets" element={<BudgetSummary />} />
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
