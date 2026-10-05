import {useState} from 'react'

const Header = () => {
    return(
 <header>
     <h1> Budget Setup </h1> 
     <img src="" alt="stego logo" width="50px"/>
     </header>
    )
}

//button comp with two props and the onClicks call the functions 
const Button =({reset,done}) => {
    return(
        <div>
    <button type ="button" onClick={reset} > Reset </button>
    <button type ="button" onClick={done} > Done </button>
        </div>
    )
}

//object that will make every filed value blank all at once for reset 
const emptyForm ={
    categoryName: '',
    expectedIncome:'',
    limitAmount: '',
    budgetPeriod:''
}

//the screen itself that receives 
const BudgetSetup({onDone}) {
  const [form, setForm] = useState(emptyForm)
  
  const handleChange = (event) => {
    const {name, value} = event.target
    setForm((prev) => ({...prev, [name] :value}))
  }
}
const handleReset = () => setForm(emptyForm)
const handleDone = () => onDone(form) 


/*function App() {
  const [screen,setScreen] = useState(1) //setScreen will change the screen after clicking done
  const [form, setForm] = useState(emptyForm) //starts empty and setForm will change it 
  const handleChange = (event) => {
    const {name, value} = event.target.value
    setForm((prev)) => ({...prev , [n]})
  }
  return (
    <>
      <Header/>
    </>
  )
}*/

export default App