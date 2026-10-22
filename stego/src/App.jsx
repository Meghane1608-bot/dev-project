import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TransactionDashboard from './components/transactiondashboard';
import BudgetDashboard from './components/Budgetdashboard';
import CategoriesOverview from './components/CategoriesOverview';
import './App.css'; // Import your CSS file for styling
import { useState } from 'react'
{/*import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'*/}
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import BudgetSetup from './BudgetSetup'
import BudgetDashboard from './BudgetDashboard'
import Category from './Category.jsx' 
import Overview from './Overview.jsx' 
import AddAccount from './AddAccount'
import AccountDashboard from './AccountDashboard'



function App() {

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FEFBF0] pb-20"> {/* pb-20 leaves room for your edge-to-edge bottom nav */}
        
        {/* Main Route Views */}
        <Routes>
          <Route path="/" element={<TransactionDashboard />} />
          <Route path="/transactions" element={<TransactionDashboard />} />
          <Route path="/budgets" element={<BudgetDashboard />} />
          <Route path="/categories" element={<CategoriesOverview />} />
          {/* Add more routes here as your teammates merge their screens */}
        </Routes>

        {/* Global Bottom Navigation Bar (matches your teammate's edge-to-edge design) */}
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
    <>
    <BrowserRouter>
    <Routes> 

      <Route 
    path = "/CreateAccount" 
    element={<AddAccount />}
    />
    <Route 
    path = "/Home" 
    element={<AccountDashboard />}
    />
   <Route 
    path = "/" 
    element={<BudgetSetup />}
    />
    
    {/* budget dashboard route*/}
<Route 
   path="/BudgetDashboard"
   element={<BudgetDashboard/> }
/> 
{/*Category and overview route*/} 
  <Route path ="/category" element = {<Category/>}/>
  <Route path ="/overview" element = {<Overview/>}/> 
</Routes>
</BrowserRouter>
      {/*<BudgetSetup onDone={()=>{console.log("Hey")}} />*/}
    </>
  )
}

export default App 
