import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeft, Home, User, CreditCard, Calculator } from 'lucide-react'
import './BudgetDashboard.css'
import Savings from './Savings'

const Header = () => {
  const navigate = useNavigate() //initialise navigate 

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

const handleSavings= () =>{
  /* in this part initially it will display the amnt from account dashboard showing how much is in savings 
  and then they can add a savings goal by clicking on the button that will allow them to input an amount and the name
  of the savings goal eg. Travel R15000 and that should save to the RAM and display */
  console.log("target")
} 

const BudgetDashboard = () => {
  const location = useLocation()

  // Retrieve categories and budgetPeriod passed via router state
  const items = location.state?.items || [] //
const budgetMonth = location.state?.budgetPeriod || 'January' //doesnt display yet. I need it to display on the dashboard depending on what the user entered

  // Group by category type
  const incomeItems = items.filter((item) => item.categoryType === 'Income')
  const expenditureItems = items.filter((item) => item.categoryType === 'Expenditure')
  

  // Totals
  const totalExpectedIncome = incomeItems.reduce((acc, curr) => acc + Number(curr.expectedIncome || 0), 0)
  const totalExpenditure = expenditureItems.reduce((acc, curr) => acc + Number(curr.limitAmount || 0), 0)
  //const leftToSpend= this should be total expenditure(actual) - total limits set
  // const received = total income actually received 

  
 
//expenditure list 
let expenditureList 
 if (expenditureItems.length >0 ) {
  expenditureList = (
    <ul className="category-list" >
      {expenditureItems.map ((item,index) => (
    <li key={index} className="category-row" > 
       <span className="category-name" > {item.categoryName || item.category} </span>
       <span className="category-amount" > 
        R{Number(item.limitAmount || item.amount || 0).toLocaleString()}
       </span>
    </li>
    ) ) } 
    </ul>
  )
 } else{
  expenditureList=<p className="empty-msg"> No expenditures added yet.</p>
 }

 //Income list 
 let incomeList
 if (incomeItems.length>0 ) {
  incomeList = (
    <ul className="category-list"> 
    {incomeItems.map((item,index) => (
      <li key={index} className="category-row" > 
      <span className="category-name"> {item.categoryName || item.category}</span>
      <span className="category-amount" >
        R{Number(item.expectedIncome || item.amount || 0).toLocaleString()}
      </span>
      </li>
    )
    )}
    </ul>
  ) 
} else {
    incomeList =<p className="empty-msg">
       No income added yet.
    </p>
  }
 
  
  return (
    <div className="budget-page-container">
      <Header />
<div className="dashboard-grid-container" > 
      <main className="budget-main-card">
        <h2 className="page-subtitle">  {budgetMonth} Budget Overview</h2>


        {/* Expenditure Section */}
        <div className="dashboard-section">
             <div className="section-header">
                <span className="section-title expenditure-title">
                  Expenditure </span>
             <div className="section-header-right" >
              <span className="label-spending-limits"> spending limits</span>
              
             </div>

             </div>{/*section header div*/}
       {expenditureList}

        </div> {/*outermost div tag*/}

   <hr className="section-divider"/> 

        {/* Income Section */}
       < div className="dashboard-section">
          <div className="section-header" >
             <span className="section-title income-title">
              Income 
             </span>
             <span className="Label-expected"> income expected to receive </span>

          </div>{/*section header div*/}
       
       {incomeList}
       
       </div>{/*outermost div*/}  

      
     </main>



      {/*Right status panel cards*/}
      <div className="dashboard-side-panel">
        <div className="side-card">
          <div className="side-card-title"> Budget Status:</div>
        </div>
      

   <div className="side-card"> 
     <div className="side-card-title"> Left to spend:</div>
    <div className="stat-amount-large">
      R waiting4db
    </div>
   </div> {/*outermost div*/}

   <div className="side-card">
    <div className="side-card-title" > Income received</div>
      <div className="stat-amount-large">
        R of {totalExpectedIncome.toLocaleString()}
        </div>
    </div>
    
    </div>
</div> {/*close grid parent*/}


  <h6> Savings  </h6> 
    <Savings/> 

    {/*create new budget button*/} 
 <button 
       className="btn-add-budget" 
          onClick={() => navigate('/BudgetSetup')} >
            Create new budget?
      </button>
    


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
