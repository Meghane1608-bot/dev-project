            import Navbar from "./Navbar";
            import "./Overview.css"
            import { Home, User, CreditCard,Receipt,ShoppingCart, Clapperboard ,TramFront,GraduationCap, Folder,HandCoins,BookOpen} from "lucide-react";
           
            export default function Overview() { 
            return ( 
            <div className = "overview-page"> 
            <h1 className="overview-title">
            Categories Overview
            </h1>  

            <section className ="category-section">
            <h2 className ="section-heading"> 
            INCOME</h2> 
            <div className = "category-row">
            <span className ="category-icon"><BookOpen size ={22}/></span> 
            <span className ="category-name"> NSFAS</span> 
            <span className = "income-amount">+R1500.00</span>
            <span className = "category-date">05 Sept 2026</span>
            <button type ="button" className = "view-button">View</button> 
            </div>
            <div className = "category-row" >
            <span ClassName = "category-icon"> <HandCoins size ={22}/></span>
            <span className ="category-name">Tutoring Salary</span>
            <span className ="income-amount">+R2500.00</span>
            <span className = "category-date"> 25 Sept 2026</span>
            <button type ="button" className = "view-button">View</button>
            </div> 

            
            <div className = "category-row">
            <span className ="category-icon"><Folder size ={22} /></span>   
            <span className = "category-name">OTHER</span>
            <span className = "income-amount">+R500.50</span>
            <span className = "category-date">10 Sept 2026</span>
            <button type = "button" className = "view-button">View</button>
            </div> 
            </section>  
              <section className = "category-section">
            <h2 className = "section-heading">EXPENSES</h2>
            <div className = "category-row">
            <span className ="category-icon"><ShoppingCart size ={22}/></span>
            <span className ="category-name">Groceries</span>
            <span className = "expense-amount"> - R1500.00</span>
             <span className = "category-date">15 Sept 2026</span>
             <button type ="button" className ="view-button">View</button>
            </div> 
            <div className ="category-row">
                <span className ="category-icon"> <Clapperboard size ={22}/></span>
                <span className = "category-name">ENTERTAINMENT</span>
                <span className ="expense-amount"> - R1000.00</span>
                <span className= "category-date"> 04 Sept 2026</span>
                <button type = "button" className = "view-button">View</button>
            </div>
            <div className = "category-row">
                <span className = "catgeory-icon"><TramFront size ={22}/></span>
                <span className = "category-name"> TRANSPORT</span>
                <span className ="expense-amount"> - R567.72</span>
                <span className = "category-date"> 29 Sept 2026</span>
                <button type = "button" className ="view-button">View</button>
            </div>
            <div className = "category-row">
                <span className ="category-icon"><GraduationCap size ={22}/></span>
             <span className = "category-name">SCHOOL EXPENSES</span>
             <span className = "expense-amount"> - R3000.00</span>
             <span className = "category-date"> 15 Sept 2026</span>
            <button type = "button" className ="view-button">View</button>
            </div>
            <div className = "category-row">
                <span className ="catgory-icon"><Folder size ={22}/></span>
            <span className = "category-name">OTHER</span>
             <span className ="expense-amount">- R260.00</span> 
             <span className ="category-date"> 18 Sept 2026</span>
             <button type = "button" className = "view-button">View</button>
            </div>
            </section>  

           <Navbar/> 
            </div>  
        
    ) 
} 