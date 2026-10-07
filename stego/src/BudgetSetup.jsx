import React, { useState } from 'react'

// Shadcn Select component
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Lucide icons
import { ChevronLeft, Home, User, CreditCard, Receipt } from 'lucide-react'

// Import external styles
import './BudgetSetup.css'

const emptyForm = {
  categoryName: '',
  categoryType: 'Income',
  expectedIncome: '',
  limitAmount: '',
  budgetPeriod: ''
}

const categoryItems = [
  { label: "Groceries", value: "Groceries" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Transport", value: "Transport" },
  { label: "NSFAS", value: "NSFAS" },
  { label: "Bursary stipend", value: "Bursary stipend" }, 
  { label: "Salary", value: "Salary" },
]

const onDone = () => {
    console.log("Hello")
  }

const BudgetSetup = ({ onAdd, onDone }) => { 
  const [form, setForm] = useState(emptyForm)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleValueChange = (fieldName, value) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }))
  }

  const isFormComplete = 
    form.categoryName !== "" &&
    form.expectedIncome !== "" &&
    form.limitAmount !== "" &&
    form.budgetPeriod !== "" &&
    Number(form.expectedIncome) >= 0 &&
    Number(form.limitAmount) >= 0;

  const handleAdd = () => {
    if (!isFormComplete) return;

    if (typeof onAdd === 'function') {
      onAdd({
        ...form,
        expectedIncome: Number(form.expectedIncome),
        limitAmount: Number(form.limitAmount),
      });
    }

    setMessage(`${form.categoryName} has been added to your budget`)
    setForm(emptyForm)
    setTimeout(() => setMessage(''), 3000)
  }

  

  const handleReset = () => { 
    setForm(emptyForm)
  }

  return ( 
    <div className="budget-page-container">
      {/* Header */}
      <header className="budget-header">
        <div className="budget-header-left">
          <button type="button" className="back-btn">
            <ChevronLeft className="back-icon" />
          </button>
          <h1 className="budget-title">Budget setup</h1>
        </div>
        <img 
          src="https://api.dicebear.com/7.x/bottts/svg?seed=stego" 
          alt="stego logo" 
          className="stego-logo" 
        />
      </header>

      {/* Main Card Layout */}
      <main className="budget-main-card">
        {message && <p className="notification-message">{message}</p>}

        <div className="budget-form-grid">
          
          {/* Category Name */}
          <div className="form-field-group">
            <label className="field-label">Set category name*</label>
            <Select 
              value={form.categoryName}
              onValueChange={(val) => handleValueChange("categoryName", val)}
            >
              <SelectTrigger className="select-trigger-custom"> 
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl shadow-lg border-none">
                <SelectGroup>
                  {categoryItems.map((item) => (
                    <SelectItem key={item.value} value={item.value} className="py-2 cursor-pointer">
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Category Type Switch */}
          <div className="form-field-group">
            <label className="field-label">Select category type*</label>
            <div className="toggle-wrapper">
              <button
                type="button"
                onClick={() => handleValueChange("categoryType", "Income")}
                className={`toggle-btn ${form.categoryType === "Income" ? "active-income" : ""}`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => handleValueChange("categoryType", "Expenditure")}
                className={`toggle-btn ${form.categoryType === "Expenditure" ? "active-expenditure" : ""}`}
              >
                Expenditure
              </button>
            </div>
          </div>

          {/* Expected Income Input */}
          <div className="form-field-group">
            <label htmlFor="expectedIncome" className="field-label">Set expected income*</label>
            <input 
              id="expectedIncome"
              name="expectedIncome"
              type="text"
              value={form.expectedIncome}
              onChange={handleChange}
              placeholder="R0-100000"
              className="budget-input"
            />
          </div>

          {/* Limit Amount Input */}
          <div className="form-field-group">
            <label htmlFor="limitAmount" className="field-label">Set limit amount*</label>
            <input 
              id="limitAmount"
              name="limitAmount"
              type="text"
              value={form.limitAmount}
              onChange={handleChange}
              placeholder="R0-100000"
              className="budget-input"
            />
          </div>

          {/* Budget Period Input */}
          <div className="form-field-group">
            <label htmlFor="budgetPeriod" className="field-label">Budget period*</label>
            <input 
              id="budgetPeriod"
              name="budgetPeriod"
              type="text"
              value={form.budgetPeriod}
              onChange={handleChange}
              placeholder="1 - 12 months"
              className="budget-input"
            />
          </div>

          {/* Action Buttons */}
          <div className="action-buttons-wrapper">
            <button
              type="button"
              onClick={handleAdd}
              disabled={!isFormComplete}
              className="btn-secondary"
            >
              ADD CATEGORY
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary"
            >
              RESET
            </button>
          </div>
        </div>

        {/* Done Button */}
        <div className="done-container">
          <button type="button" onClick={onDone} className="btn-done">
            DONE
          </button>
        </div>
      </main>

      {/* Navigation Bar */}
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

export default BudgetSetup