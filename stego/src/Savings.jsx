import React from 'react'
import {useState} from 'react' 
 


const Savings =() => {
  const [goals, setGoals] = useState([])
  const [targetName , setTargetName] =useState("")
  const [isOpen,setIsOpen] = useState(false)
  const [targetAmnt, setTargetAmnt] = useState("")
  const [date, setDate] = useState("")

  const handleSavings = () => {
   setIsOpen(true)
}

const handleSavingsGoal = (event) => {
    event.preventDefault()
    if (!targetName.trim() || Number(targetAmnt) <=0) {
        alert("Please enter a valid target name and an amount greater than 0 ")
        return
    }

const newGoal ={
    id:Date.now(),
    targetName: targetName,
    targetAmnt: Number(targetAmnt),
    date: date || 'January 2026',
}
setGoals([...goals, newGoal])

//reset form 
setTargetName('')
setTargetAmnt('')
setDate('')
setIsOpen(false)
}

    return (
        <>
     <button className= "add-savings" 
     onClick={handleSavings} > Add goal 
     </button>

     {isOpen && (
        <div className="modal">
           <form onSubmit={handleSavingsGoal}>
           <input 
           placeholder="Goal Name(eg.Durban trip)"
           value={targetName} 
           onChange={(event) => setTargetName(event.target.value)}
           />
           <input 
           placeholder="Target amount"
           type="number" 
           value={targetAmnt}
            onChange={(event) => setTargetAmnt(event.target.value)}
            />
           <input 
           type="date"
           value={date} 
           onChange={(event) => setDate(event.target.value)}
           />
       <button type="submit" > Save </button>
       <button 
       type="button" 
       onClick={ () => setIsOpen(false) }>
         Cancel 
               </button>
           </form>
     </div>
     )}

     <div className="goals-list"> 
        {goals.map((goal)=> (
            <div key={goal.id} className="goal-card">
                <h5> {goal.targetName} </h5>
                <p> Target: R{goal.targetAmnt.toLocaleString() } </p>
                <small> Target Date: {goal.date} </small> 
        </div> 
        ))}
  
        </div> 
    </> 
    )
} 

export default Savings 