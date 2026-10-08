import React from 'react'
 import { useState } from 'react'
 import { ChevronLeft, Home, User, CreditCard,  Calculator } from 'lucide-react'
 import {useLocation} from 'react-router-dom'

 const Header = () => {
   return (
     <header className="budget-header">
       <div className="budget-header-left">
         <button
          type="button" className="back-btn">
           <ChevronLeft className="back-icon" />
         </button>
         <h1 className="budget-title">Budget Dashboard </h1>
       </div>
       <img src="" alt="stego logo" className="stego-logo" width="50px" />
     </header>
   )
 }

 const BudgetDashboard =() => {
   const location = useLocation()
   const setupData = location.state?.form

    return(
        <div> 
 <h2 className= "page-subtitle" > September 2026 Budget Overview </h2>
 {/*label expenditure items that were added as expenditure from budget setup*/}

</div>
    )
 }

 export default BudgetDashboard

