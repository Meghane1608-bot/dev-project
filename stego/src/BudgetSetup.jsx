import 'react'
 import { useState } from 'react'

 //this will allow me routing for react, so that users can get to different pages
import {useNavigate} from 'react-router-dom'

//shadcn Select component 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
} from "./components/ui/select"


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
  const handleAdd = () => {
    if (!isFormComplete) return; // validation first( the return is there so nothing runs below it.)
    const newItem = { //building the new item 
      ...form, //spread operator to copy every propoerty from form
      //id: String()
      expectedIncome: form.expectedIncome ? Number(form.expectedIncome) : 0, //if theres a value convert it and if not "" = 0
      limitAmount: form.limitAmount ? Number(form.limitAmount) : 0,
    };

    if (typeof onAdd === 'function') {
      onAdd(newItem);
    } //

    setAddedCategories((prev) => [...prev, newItem]); /* builds a new array containing old+ the new item
    Prev guarantees it will give the latest state and we can compute the next one from it */
    setForm(emptyForm); // after adding the cat, the form should clear
    setMessage(`${form.categoryName} has been added to your budget`)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleReset = () => { 
    //message pop up to tell them their cats will be deleted 
    setForm(emptyForm) //clears the inputs
    setAddedCategories([]) // empty array
    setMessage('Budget categories have been reset')
    setTimeout(() => setMessage(''), 3000)
  } 

  //navigate to budget dashboard 
  const handleDone = () => {
    navigate('BudgetDashboard', 
      {state:
        {items: addedCategories,
          budgetPeriod: form.budgetPeriod || 'January'
          } ,
        })
  } 

  // Check if user has added more than 2 categories
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

          <p className="col-span-2"> Categories available : {categoryItems.length} </p>

          <Button 
            add={handleAdd}
            reset={handleReset}
            addDisabled={!isFormComplete}
          />



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
}

export default BudgetSetup