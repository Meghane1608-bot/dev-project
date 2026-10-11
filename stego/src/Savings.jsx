import React from 'react'
import useState from {useState}
 import BudgetDashboard from '/BudgetDashboard'

const [goals, setGoals] = useState([])
const [targetName , setTargetName] =useState("")
const [isOpen,setIsOpen] = useState(false)
const [targetAmnt, setTargetAmnt] = useState("")
const [date, setDate] = useState("")

const handleSavings = () => {
   setIsOpen=true

}

const handleSavingsGoal = (event) => {
    event.preventDeafult()
    targerName = !"" 
    targetAmnt>0
 const savingsGoal = [
    id= Date.now(),
    targetName="Durban trip",
    targetAmnt=Number(5500),
    date= budgetDashboard(budgetPeriod)
 ]
setGoals([...goals, newGoals ]) 
}

const Savings =() => {
    return (
        <>
     <button className= "add-savings" 
     onClick={handleSavings} > Add goal 
     </button>

     {isOpen && (
        <div className="modal">
           <form onSubmit={handleSavingsGoal}>
           <input value={targetName} onChange={(event) => setTargetName(event.target.value)}/>
           <input value={targetAmnt} type="Number" onChange={(event) => setTargetAmnt(event.target.value)}/>
           <input value={date} onChange={(event) => setDate(event.target.value)}/>
       <button type="submit" > Save </button>
       <button type="button" onClick={ () => setIsOpen(false) }> Cancel </button>
           </form>
            </div>
     )}

     {goals.map((goal) => (
        <div key={goal.id} > 
        
     
        }


        </> 
    )
}

export default Savings 