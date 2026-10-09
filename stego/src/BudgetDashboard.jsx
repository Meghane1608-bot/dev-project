import React from 'react'
import { ChevronLeft, Home, User, CreditCard, Calculator } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <header className="budget-header">
      <div className="budget-header-left">
        <button 
          type="button" 
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="back-icon" />
        </button>
        <h1 className="budget-title">Budget Dashboard</h1>
      </div>
      <img src="" alt="stego logo" className="stego-logo" width="50px" />
    </header>
  )
}

const BudgetDashboard = () => {
  const location = useLocation()
  
  // Safely extract items or single form data passed via router state
  const items = location.state?.items || (location.state?.form ? [location.state.form] : [])

  // Filter items where categoryType is Expenditure
  const expenditureItems = items.filter(
    (item) => item.categoryType === "Expenditure"
  )

  return (
    <div className="budget-page-container">
      <Header />

      <main className="budget-main-card">
        <h2 className="page-subtitle text-xl font-semibold mb-4">
          September 2026 Budget Overview
        </h2>

        {/* Render Expenditure Items */}
        <section className="expenditure-section mt-4">
          <h3 className="text-lg font-medium text-[#1C5B65] mb-2">
            Expenditure Items
          </h3>

          {expenditureItems.length === 0 ? (
            <p className="text-sm text-gray-500">No expenditure items added yet.</p>
          ) : (
            <ul className="space-y-2">
              {expenditureItems.map((item, index) => (
                <li 
                  key={index} 
                  className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{item.categoryName}</p>
                    <p className="text-xs text-gray-500">Period: {item.budgetPeriod}</p>
                  </div>
                  <span className="font-bold text-red-600">
                    R{item.limitAmount}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

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
    </div>
  )
}

export default BudgetDashboard

