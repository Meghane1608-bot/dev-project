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
const Button =({reset,done, add}) => {
    return(
        <div>
    <button type ="button" onClick={reset} > Reset </button>
    <button type ="button" onClick={done} > Done </button>
     <button type ="button" onClick={add} > Done </button>  
        </div>
    )
}

//object that will make every filed value blank all at once for reset 
const emptyForm ={
    categoryName: '',
    categoryType : "",
    expectedIncome:'',
    limitAmount: '',
    budgetPeriod:''
}

//the screen itself that renders the button component and header component
const BudgetSetup = () => { ({categories , onAdd, onReset, onDone}) 
  const [form, setForm] = useState(emptyForm) //setForm will change the four fields of the form
  const [message , setMessage] = useState("") // message pop up once category added 


  const handleChange = (event) => {
    const {name, value} = (event.target.value)
    setForm((prev) => ({...prev, [name] :value})) 
    //copy everything from prev
  }

}

//object 
const isFormComplete = 
form.categoryName !== "" &&
form.categoryType !== "" &&
form.budgetPeriod !== "" &&
form.expectedIncome !== "" &&
form.limitAmount !== "" &&
Number(form.expectedIncome) > 0 &&
Number(form.limitAmount) > 0;

//what happens when the add button is clicked
const handleAdd = () => {
  onAdd({
    ...form,
    //id: String()
    expectedIncome: Number(form.expectedIncome),
    limitAmount : Number(form.limitAmount),
  });
  setMessage('{form.categoryName} has been added to your budget')
  setForm(emptyForm) // after adding the cat, the form should clear
  setTimeout( () => setMessage('') , 3000)
}

const handleReset = () => setForm(emptyForm) //clears the form
const handleDone = () => onDone(form) //calls the onDone func and passes it in the current form

return( 
  <div>
    <select name="category" value={form.categoryName} onChange={handleChange} > 
    


    </select>
  </div>
)

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