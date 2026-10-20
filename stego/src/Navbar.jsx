import { Home, User, CreditCard, Calculator } from "lucide-react";
import "./Category.css"; 

export default function Navbar() {
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