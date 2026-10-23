import { Home, User, CreditCard, Calculator } from "lucide-react";
import{useNavigate} from "react-router-dom" 
import "./Category.css"; 

export default function Navbar() {
const navigate =useNavigate () ; 
  return (
    <nav className="bottom-nav">
      {/* Home icon that navigates to Account Dashboard screen */} 
      <button 
        type="button" 
        className="nav-icon-btn" 
        onClick={() => navigate('/accountdashboard')}
      >
        <Home className="nav-icon" />
      </button>

      {/* User icon that navigates to Categories Overview screen */}
      <button 
        type="button" 
        className="nav-icon-btn" 
        onClick={() => navigate('/overview')}
      >
        <User className="nav-icon" />
      </button>

      {/* CreditCard icon that navigates to Add Account screen / Transactions (Placeholder route because I can't find the transaction page )  */}
      <button 
        type="button" 
        className="nav-icon-btn" 
        onClick={() => navigate('/addaccount')}
      >
        <CreditCard className="nav-icon" />
      </button>

      {/* Calculator icon that navigates to Budget Dashboard screen */}
      <button 
        type="button" 
        className="nav-icon-btn" 
        onClick={() => navigate('/BudgetDashboard')}
      >
        <Calculator className="nav-icon" />
      </button>
    </nav>
  );
} 