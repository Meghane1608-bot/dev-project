import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeft, Home, User, CreditCard, Receipt } from 'lucide-react'
import './BudgetDashboard.css'

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

  // Retrieve categories passed via router state
  const items = location.state?.items || []

  // Group by category type
  const incomeItems = items.filter((item) => item.categoryType === 'Income')
  const expenditureItems = items.filter((item) => item.categoryType === 'Expenditure')

  // Totals
  const totalIncome = incomeItems.reduce((acc, curr) => acc + Number(curr.expectedIncome || 0), 0)
  const totalExpenditure = expenditureItems.reduce((acc, curr) => acc + Number(curr.limitAmount || 0), 0)

  return (
    <div className="budget-page-container">
      <Header />

      <main className="budget-main-card">
        <h2 className="page-subtitle">Budget Overview</h2>

        {/* Income Section */}
        <section className="dashboard-section">
          <div className="section-header">
            <h3 className="section-title income">Income</h3>
            <span className="section-total income">Total: R{totalIncome}</span>
          </div>

          {incomeItems.length === 0 ? (
            <p className="empty-msg">No income categories added.</p>
          ) : (
            <ul className="category-list">
              {incomeItems.map((item, index) => (
                <li key={index} className="category-card income">
                  <div className="category-info">
                    <span className="category-name">{item.categoryName}</span>
                    <span className="category-period">Period: {item.budgetPeriod}</span>
                  </div>
                  <span className="category-amount income">R{item.expectedIncome}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Expenditure Section */}
        <section className="dashboard-section">
          <div className="section-header">
            <h3 className="section-title expenditure">Expenditure</h3>
            <span className="section-total expenditure">Total: R{totalExpenditure}</span>
          </div>

          {expenditureItems.length === 0 ? (
            <p className="empty-msg">No expenditure categories added.</p>
          ) : (
            <ul className="category-list">
              {expenditureItems.map((item, index) => (
                <li key={index} className="category-card expenditure">
                  <div className="category-info">
                    <span className="category-name">{item.categoryName}</span>
                    <span className="category-period">Period: {item.budgetPeriod}</span>
                  </div>
                  <span className="category-amount expenditure">R{item.limitAmount}</span>
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
          <Receipt className="nav-icon" />
        </button>
      </nav>
    </div>
  )
}

export default BudgetDashboard
