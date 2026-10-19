import { useState } from 'react'
{/*import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'*/}
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import BudgetSetup from './BudgetSetup'
import BudgetDashboard from './BudgetDashboard'
import AddAccount from './AddAccount'
import AccountDashboard from './AccountDashboard'



function App() {

  return (
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
    path = "/BudgetSetup" 
    element={<BudgetSetup />}
    />
    
    {/* budget dashboard route*/}
<Route 
   path="/BudgetDashboard"
   element={<BudgetDashboard/> }
/> 
</Routes>
</BrowserRouter>
      {/*<BudgetSetup onDone={()=>{console.log("Hey")}} />*/}
    </>
  )
}

export default App
