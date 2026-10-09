import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
//import './BudgetSetup.jsx'
import BudgetSetup from './BudgetSetup'
import BudgetDashboard from './BudgetDashboard'

function App() {
  const [count, setCount] = useState(0)

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
