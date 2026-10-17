 
import "./Category.css" ;
import {ArrowLeft,Home,User,CreditCard,Receipt} from "lucide-react" 
export default function Category() { 
  return ( 
    <div className ="category-page"  > 
    <button type ="button" aria-label = "Go back">
      <ArrowLeft size = {24}/>
      </button> 
    <h1 className ="category-title"> 
    Category setup </h1>  
    <div className ="category-container">
    <h2>Select category type </h2>   

    <div className ="category-type">  
     <button type ="button" className ="category-option">
      Income</button> 

    <button type ="button" className ="category-option">
      Expenditure</button> 
    </div> 
    <h2> Select category name</h2> 
    <select className ="category-select"> 
    <option> Groceries</option> 
    <option> Entertainment</option> 
    <option> Transport</option>
    <option> NSFAS </option>
    </select> 
    <div className = "category-reset"> 
    <button type ="button" className = "reset-button"> 
      RESET</button> 
      </div> 
      <button type ="button" className = "done-button"> 
        DONE 
      </button>
    </div> 
    
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
          <Receipt className="nav-icon" />
        </button>
      </nav>
    </div> 
 


)
}
