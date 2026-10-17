import './style.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
//import './BudgetSetup.jsx'
import BudgetSetup from './BudgetSetup'
import BudgetDashboard from './BudgetDashboard'
import Category from './Category.jsx' 
import Overview from './Overview.jsx' 




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
