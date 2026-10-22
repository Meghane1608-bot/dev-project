import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionDashboard from './components/transactiondashboard';
import BudgetSummary from './components/Budgetdashboard';
import CategoriesOverview from './components/CategoriesOverview';
import BudgetSetup from './BudgetSetup';
import BudgetDashboard from './BudgetDashboard';
import Category from './Category.jsx';
import Overview from './Overview.jsx';
import AddAccount from './AddAccount';
import AccountDashboard from './AccountDashboard';
import './App.css'; // Import your CSS file for styling


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FEFBF0] pb-20"> {/* pb-20 leaves room for each screen's bottom Navbar */}

        {/* Main Route Views */}
        <Routes>
          <Route path="/" element={<BudgetSetup />} />
          <Route path="/BudgetSetup" element={<BudgetSetup />} />
          <Route path="/BudgetDashboard" element={<BudgetDashboard />} />

          {/* Account routes */}
          <Route path="/CreateAccount" element={<AddAccount />} />
          <Route path="/AddAccount" element={<AddAccount />} />
          <Route path="/Home" element={<AccountDashboard />} />
          <Route path="/AccountDashboard" element={<AccountDashboard />} />

          {/* Category and overview routes */}
          <Route path="/category" element={<Category />} />
          <Route path="/overview" element={<Overview />} />

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