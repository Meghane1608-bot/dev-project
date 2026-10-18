import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, User, CreditCard,  Calculator  } from 'lucide-react'
import {useState} from 'react'


const Header = () => {
  const navigate = useNavigate() //initialise navigate 

  return (
    <header className="account-header">
      <div className="account-header-left">
        <button 
          type="button" 
          className="back-btn" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="back-icon" />
        </button>
        <h1 className="account-title"> Accounts Overview </h1>
      </div>
      <img src="" alt="stego logo" className="stego-logo" width="50px" />
    </header>
  )
}

const AccountDashboard = () => {
     //amnts must come from the database. 
/* to do:
  a card for total net worth = amnt in all accounts + savings acc
  a card that shows amount in current acc
    a card that shows amount in savings acc
    button to add a new account that navigates to the add account screen
    a button to go to savings(navigates to budget dashboard bc ive created a savings component there)
*/
    return(
<div>

    <Header/>

        //navigation bar 
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

      </div> //outermost div for account dashboard component 
  
    )
}



export default AccountDashboard 