import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, User, CreditCard,  Calculator  } from 'lucide-react'
import {useState, useEffect} from 'react'
import { Button } from '@/components/ui/button'
import {Card , CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import { fetchAccounts } from './api';


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

const formatMoney=(n) => `R${n.toFixed(2)}` //to format the number to currency
const sum =(list) => list.reduce((total,acc) => total + acc.balance,0) 


const AccountDashboard = () => {
     //addAccount writes & collects and sends them to be saved
     //accDashboard reads them from the database  
     const [accounts, setAccounts] = useState([]) //holds the list of accounts
    const [loading,setLoading]= useState(true) 
    const [error, setError]= useState('')
    

useEffect(() => {
    fetchAccounts() //fetch the list of accounts from the backend
    .then((response) => {
        setAccounts(response|| []) //set the accounts state to the data received
        
    })
    .catch((err) => {
        setError(err.response?.data?.error || 'Couldnt load accounts. ') //set error message if fetch fails
    })
    .finally(() => {
        setLoading(false) //set loading to false regardless of success or failure
    })
}, [])

//filter only the current accounts and use reduce to add up the balances 
const currentTotal = sum(accounts.filter(acc => acc.type === 'current')) //sum of balances where type is current
const savingsTotal = sum(accounts.filter(acc => acc.type === 'savings')) //sum of balances where type is savings
const netWorth = currentTotal + savingsTotal //total net worth = current total  + savings acc total 
 
   if (loading) return <p > Loading...</p>
   if (error) return <p role= "alert" > {error} </p>

    return(
<div>
    <Header/>

    <Card className="account-card">
        <CardHeader>
        <CardTitle> Total net worth </CardTitle>
        </CardHeader>
        <CardContent className="account-card-content">
            {formatMoney(netWorth)}
        </CardContent>
    </Card>

    <Card className="account-card">
        <CardHeader>
            <CardTitle> Current Account </CardTitle>
        </CardHeader>
        <CardContent className="account-card-content">
            {formatMoney(currentTotal)}
        </CardContent>
    </Card>

    <Card className="account-card">
        <CardHeader>
            <CardTitle> Savings Account </CardTitle>
        </CardHeader>
        <CardContent className="account-card-content">
            {formatMoney(savingsTotal)}
        </CardContent>
    </Card>

    <Button 
    type="button" 
    onClick={() => navigate('/AddAccount')}>
   Add account 
    </Button>

    <Button  
    type="button"
    onClick={() => navigate('/BudgetDashboard')}>
        View Savings 
     </Button>
 


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