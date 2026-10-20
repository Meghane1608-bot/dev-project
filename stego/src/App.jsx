import { useState } from 'react'
{/*import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'*/}
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
//import './BudgetSetup.jsx'
import BudgetSetup from './BudgetSetup'
import BudgetDashboard from './BudgetDashboard'
import Category from './Category.jsx' 
import Overview from './Overview.jsx' 
import Login from './Login.jsx' 





function App() {

  return (
    <>
    <BrowserRouter>
    <Routes> 
    <Route path = "/" element = {<Login/>} /> 
   <Route 
    path = "/budgetSetup" 
    element={<BudgetSetup />}
    />
    
    {/* budget dashboard route*/}
<Route 
   path="/BudgetDashboard"
   element={<BudgetDashboard/> }
/> 
{/*Category and overview route*/} 
  <Route path ="/category" element = {<Category/>}/>
  <Route path ="/overview" element = {<Overview/>}/> 
</Routes>
</BrowserRouter>
      {/*<BudgetSetup onDone={()=>{console.log("Hey")}} />*/}
    </>
  )
} 

export default App 
