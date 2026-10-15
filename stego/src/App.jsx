import { useState } from 'react'
import './style.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
//import './BudgetSetup.jsx'
import BudgetSetup from './BudgetSetup'
import BudgetDashboard from './BudgetDashboard'




function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes> 
   <Route 
    path = "/" 
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
