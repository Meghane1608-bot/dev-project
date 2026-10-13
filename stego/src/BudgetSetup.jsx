import React from 'react'
 import { useState } from 'react'

 //this will allow me routing for react, so that users can get to different pages
import {useNavigate} from 'react-router-dom'

//shadcn SElect component 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
} from "@/components/ui/select"

/*shadcn Required field component
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"*/

import { ChevronLeft, Home, User, CreditCard,  Calculator  } from 'lucide-react'
import './BudgetSetup.css'

const Header = () => {
  return (
    <header className="budget-header">
      <div className="budget-header-left">
        <button type="button" className="back-btn">
          <ChevronLeft className="back-icon" />
        </button>
        <h1 className="budget-title">Budget Setup</h1>
      </div>
      <img src="" alt="stego logo" className="stego-logo" width="50px" />
    </header>
  )
}

//button comp with props and the onClicks call the functions 
const Button = ({ reset, add, addDisabled }) => {
  return (
    <div className="action-buttons-wrapper">
      <button type="button" onClick={add} disabled={addDisabled} className="btn-secondary">
        Add Category
      </button>
      <button type="button" onClick={reset} className="btn-secondary">
        Reset
      </button>
    </div>
  )
}

{/*const onDone = () => {
  console.log("Sup Gugu")
*/}

//object that will make every filled value blank for reset 
const emptyForm = {
  categoryName: '',
  categoryType: 'Income',
  expectedIncome: '',
  limitAmount: '',
  budgetPeriod: ''
}

//array of categories 
const categoryItems = [
  { label: "Groceries", value: "Groceries" },
  { label: "Transport", value: "Transport" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "NSFAS", value: "NSFAS" },
  { label: "Bursary stipend", value: "Bursary stipend" }, 
  { label: "Salary", value: "Salary" },
]

//the screen itself that renders the button component and header component
const BudgetSetup = ({ onAdd }) => { 
  const [form, setForm] = useState(emptyForm) //setForm will change the four fields of the form
  const [message, setMessage] = useState("") // message pop up once category added 
 const navigate =useNavigate() // initialising the navigate funcion
const [addedCategories, setAddedCategories] = useState([])


  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value })) 
    //copy everything from prev
  }

  const handleSelectChange = (fieldName, value) => {
    setForm((prev) => {
      const updated = { ...prev, [fieldName]: value }
      // If switching to Expenditure, clear expectedIncome
      if (fieldName === "categoryType" && value === "Expenditure") {
        updated.expectedIncome = ""
      }
      // If switching to Income, clear limitAmount
    if (fieldName === "categoryType" && value === "Income") {
      updated.limitAmount = ""
    }
      return updated //
    }) 
    //copy everything from prev
  }

  //object 
  const isIncome = form.categoryType === "Income"
  const isExpenditure = form.categoryType === "Expenditure"

  
    const isFormComplete = 
  form.categoryName !== "" &&
  form.categoryType !== "" &&
  form.budgetPeriod !== "" &&
  (isIncome 
    ? form.expectedIncome !== "" && Number(form.expectedIncome) > 0 
    : form.limitAmount !== "" && Number(form.limitAmount) > 0);



  //what happens when the add button is clicked
   {/*const handleAdd = () => {
    if (typeof onAdd === 'function') {
      onAdd({
        ...form,
        //id: String()
        expectedIncome: form.expectedIncome ? Number(form.expectedIncome) : 0,
        limitAmount: Number(form.limitAmount),
      });
    }
    setMessage(`${form.categoryName} has been added to your budget`)
    setForm(emptyForm) // after adding the cat, the form should clear
    setTimeout(() => setMessage(''), 3000)
  }*/

    //what happens when the add button is clicked
  const handleAdd = () => {
    if (!isFormComplete) return; //
    const newItem = {
      ...form,
      //id: String()
      expectedIncome: form.expectedIncome ? Number(form.expectedIncome) : 0,
      limitAmount: form.limitAmount ? Number(form.limitAmount) : 0,
    };

    if (typeof onAdd === 'function') {
      onAdd(newItem);
    } //

    setAddedCategories((prev) => [...prev, newItem]);
    setForm(emptyForm); // after adding the cat, the form should clear
    
  }

  const handleReset = () => { 
    //message pop up to tell them their cats will be deleted 
    setForm(emptyForm) //clears the form
    setAddedCategories([])
  } 

  //navigate to budget dashboard 
  const [budgetPeriod,setBudgetPeriod] =useState("January")
  
  const handleDone = () => {
    navigate('BudgetDashboard', 
      {state:
        {items: addedCategories,
          budgetPeriod:budgetPeriod
          } ,
        })
  } 

  // 4. Check if user has added more than 2 categories
  const isDoneDisabled = addedCategories.length <= 2

  return ( 
    <div className="budget-page-container">
      <Header />


      <main className="budget-main-card">
        {message && <p className="notification-message">{message}</p>}

        <div className="budget-form-grid">
          {/*  select from shadcn ui */}
          <div className="form-field-group">
            <label className="field-label">Set category name*</label>
            <Select 
              value={form.categoryName}
              onValueChange={(val) => handleSelectChange("categoryName", val)}
            >
              <SelectTrigger id="category" className="select-trigger-custom"> 
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl shadow-lg border-none">
                <SelectGroup>
                  <SelectLabel> Categories </SelectLabel>
                  {categoryItems.map((item) => (
                    <SelectItem key={item.value} value={item.value} className="py-2 cursor-pointer">
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> 
          </div>

          <div className="form-field-group">
            <label className="field-label">Select category type*</label>
            <div className="toggle-wrapper">
              <button
                type="button"
                onClick={() => handleSelectChange("categoryType", "Income")}
                className={`toggle-btn ${form.categoryType === "Income" ? "active-income" : ""}`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => handleSelectChange("categoryType", "Expenditure")}
                className={`toggle-btn ${form.categoryType === "Expenditure" ? "active-expenditure" : ""}`}
              >
                Expenditure
              </button>
            </div>
          </div>

         

    {/* Expected Income Field */}
<div className="form-field-group">
  <label htmlFor="expectedIncome" className="field-label">
    Set expected income*
  </label>
  <input 
    id="expectedIncome"
    name="expectedIncome"
    type="text"
    value={form.expectedIncome}
    onChange={handleChange}
    placeholder={isExpenditure ? "N/A (only applicable for income)" : "R0-100000"}
    className="budget-input disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
    disabled={isExpenditure}
    required={isIncome}
  />
</div>

      
    {/* Limit Amount Field */}
<div className="form-field-group">
  <label htmlFor="limitAmount" className="field-label">
    Set limit amount*
  </label>
  <input 
    id="limitAmount"
    name="limitAmount"
    type="text"
    value={form.limitAmount}
    onChange={handleChange}
    placeholder={isIncome ? "N/A (only applicable for expenditure)" : "R0-100000"}
    className="budget-input disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
    disabled={isIncome}
    required={isExpenditure}
  />
</div>

          <div className="form-field-group">
            <label htmlFor="budgetPeriod" className="field-label">
              Budget period*
            </label>
            <input 
              id="budgetPeriod"
              name="budgetPeriod"
              type="text"
              value={form.budgetPeriod}
              onChange={handleChange}
              placeholder="Month"
              className="budget-input"
              required
            />
          </div>

          

          {/*if the form isnt empty*/}
          {!isFormComplete && (
            <div className="text-sm text-muted-foreground col-span-2">
              <ul>     
                <li> Fill in all fields marked * to enable Add.</li>
              <li> Minimum of two expenditure categories and one income needs to be added to enable Done. </li> 
              </ul>
          
            </div>
          )} 

          <p className="col-span-2"> Categories added : {categoryItems.length} </p>

          <Button 
            add={handleAdd}
            reset={handleReset}
            addDisabled={!isFormComplete}
          />

      {/*<div className="done-container">
        <button type="button" onClick={handleDone} className="btn-done">
          Done
        </button>
      </div>*/}


      {/* Done Button with disabled state */}
      <div className="done-container">
        <button 
          type="button" 
          onClick={handleDone} 
          disabled={isDoneDisabled}
          className={`btn-done ${isDoneDisabled ? 'opacity-50 cursor-not-allowed bg-gray-400 border-gray-400' : ''}`}
        >
          Done
        </button>
      </div>

        </div>

        
      </main>

      {/*bottom navigation bar*/}
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
          <Calculator className="nav-icon" />
        </button>
      </nav>
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
   }
}
export default BudgetSetup