import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionDashboard from './TransactionDashboard';
import BudgetSummary from './components/Budgetdashboard';
import CategoriesOverview from './components/CategoriesOverview';
import BudgetSetup from './BudgetSetup';
import BudgetDashboard from './BudgetDashboard';
import Category from './Category.jsx';
import Overview from './Overview.jsx';
import AccountDashboard from './AccountDashboard.jsx';
import AddAccount from './AddAccount.jsx';
import Savings from './Savings.jsx';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FEFBF0] pb-20">
        <Routes>
        
          <Route path="/Home" element={<AccountDashboard />} />
          <Route path="/budgetSetup" element={<BudgetSetup />} />
          <Route path="/BudgetDashboard" element={<BudgetDashboard />} />
          <Route path="/category" element={<Category />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/accountdashboard" element={<AccountDashboard />} />
          <Route path="/addaccount" element={<AddAccount />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/CreateAccount" element={<AddAccount />} />
          <Route path="/transactions" element={<TransactionDashboard />} />
          <Route path="/budgets" element={<BudgetSummary />} />
          <Route path="/categories" element={<CategoriesOverview />} />
        </Routes>
      </div>
    </Router>
  );
}