import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeft, Home, User, CreditCard, Calculator } from 'lucide-react'
import './BudgetDashboard.css'
import Savings from './Savings'
import {useState, useEffect} from 'react'
import { fetchBudgets, fetchTransactions } from './api'


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


const BudgetDashboard = () => {
  const location = useLocation()
 const navigate = useNavigate()
 
  {/* Retrieve categories and budgetPeriod passed via router state
  const items = location.state?.items || [] //
const budgetMonth = location.state?.budgetPeriod || 'January' //doesnt display yet. I need it to display on the dashboard depending on what the user entered*/}

const [items,setItems] = useState([])
const [budgetMonth, setBudgetMonth] = useState('')
const [loading, setLoading] =useState(true)
const [error, setError] = useState(null) 

useEffect( () => {
  const load = async() => {
    setLoading(true) 
    setError(null)
    try{
      //if budget setup handed us the newly created budget use it
      if (location.state?.budget) {
        const b= location.state.budget
        setItems (b.tems || [])
        setBudgetMonth(b.period||'')
      }else {
    //else get the most recently saved budget from the database
    const budgets= await fetchBudgets()
      if (Array.isArray(budgets) && budgets.length >0){
        const latest = budgets[budgets.length-1]
        setItems(latest.items || [])
        setBudgetMonth(latest.period || '')
      }
      }

      //get the actual amts from transactions table 
    const allTransactions = await fetchTransactions()
     setTransactions(allTransactions|| [])
    } catch(err) {
      console.error('load failed', err)
      setError(
        err?.response?.data?.message ||
        err.message ||
        'failed to load budget'
      )
        
    } finally {
      setLoading(false)
    }
  }
  load() 
}, [location.state])


  // Group by category type
  const incomeItems = items.filter((item) => item.categoryType === 'Income')
  const expenditureItems = items.filter((item) => item.categoryType === 'Expenditure')
  
  // Totals
  const totalExpectedIncome = incomeItems.reduce((acc, curr) => acc + Number(curr.expectedIncome || 0), 0)
  const totalExpenditure = expenditureItems.reduce((acc, curr) => acc + Number(curr.limitAmount || 0), 0)
  //const leftToSpend= totalExpenditure- totalSpent 
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
        <h2 className="page-subtitle">  {budgetMonth} Budget Overview:</h2>


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
             <span className="label-expected"> income expected to receive </span>

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


  <h6 className= "savings-title">  Savings   </h6> 
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
