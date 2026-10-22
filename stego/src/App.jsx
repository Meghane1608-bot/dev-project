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
      <div className="min-h-screen bg-[#FEFBF0] pb-20"> {/* pb-20 leaves room for each screen's bottom Navbar */}

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

          {/* Older account route aliases (kept for now) */}
          <Route path="/CreateAccount" element={<AddAccount />} />
          <Route path="/Home" element={<AccountDashboard />} />

          {/* Daanyaal's screens */}
          <Route path="/transactions" element={<TransactionDashboard />} />
          <Route path="/budgets" element={<BudgetSummary />} />
          <Route path="/categories" element={<CategoriesOverview />} />
          {/* Add more routes here as your teammates merge their screens */}
        </Routes>
      </div>
    </Router>
  );
}
