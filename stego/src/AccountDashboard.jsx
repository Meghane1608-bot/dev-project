import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, User, CreditCard,  Calculator  } from 'lucide-react'
import {useState} from 'react'
import { Button } from '@/components/ui/button'
import {Card , CardContent, CardHeader, CardTitle} from '@/components/ui/card'


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

const formatMoney=(n) => 'R${n.toFixed(2)}' //to format the number to currency
const sum =(list) => list.reduce((total,acc) => total + acc.balance,0) 


const AccountDashboard = () => {
     //addAccount writes & collects and sends them to be saved
     //accDashboard reads them from the database  
     const [accounts, setAccounts] = useState([]) //holds the list of accounts
   
/* to do:
  a card for total net worth = current total  + savings acc total
  a card that shows amount in current acc(sum of balances where type is current)
    a card that shows amount in savings acc(sum of bals where type is savings)
    button to add a new account that navigates to the add account screen
    a button to go to savings(navigates to budget dashboard bc ive created a savings component there)
    a button to delete an account? 
*/


    return(
<div>

    <Header/>

        {/*navigation bar */}
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