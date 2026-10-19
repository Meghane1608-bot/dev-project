import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, User, CreditCard,  Calculator  } from 'lucide-react'
import {useState} from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button"



const Header = () => {
  const navigate = useNavigate() //initialise navigate 

  return (
    <header className="account-header">
      <div className="account-header-left">
        <button 
          type="button" 
          className="back-btn" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="back-icon" />
        </button>
        <h1 className="account-title">Add Account</h1>
      </div>
      <img src="" alt="stego logo" className="stego-logo" width="50px" />
    </header>
  )
}

//list for the dropdown-either current or savings account
const typeItems =[
    {label: "Current account" , value: "current"},
    {label:" Savings account" , value: "savings"},
]

const emptyForm = { 
    accountName: '',
    accountType: '',
    startingBalance: '',
    overdraftLimit: ''
}

//onAdd is a func from App that this screen calls when an acc is ready to sav
const AddAccount = ({onAdd}) => {
    const [form,setForm] =useState(emptyForm) //form holds what the user has inputted so far
    const [message , setMessage] = useState('') //account added notifier
    const [saving, setSaving] =useState(false) 
    const [error, setError] = useState('')//'' means no error, if there is an error it will be a string with the error message

    // for input fields which send an event.
    //reads which field changed and the new text then copies the old form and overwrites just that field 
    const handleChange = (e) => {
        const {name, value} = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
    }

    const handleSelectChange= (value) =>{
        setForm((prev) => ({
            ...prev,
            accountType: value
        }))
    }
     
    //the check that enables the create account button to be clicked only when all fields are filled in correctly
    const isFormComplete =
    form.accountName.trim() !== '' && //trim removes spaces so that just typing spaces doesnt count as filling in the field
    !!form.accountType && // the double !! converts the value to a boolean, so that if it is empty it will be false and if it has a value it will be true
    form.startingBalance !== '' &&
    Number(form.startingBalance) >= 0 && //positive value entered
    (form.overdraftLimit === '' || Number(form.overdraftLimit) >= 0); //blank or positive value entered

    // these will be used to determine whether the overdraft limit field is required or not depending on the account type selected
    const isSavings = form.accountType === 'savings' 
    //const isCurrent = form.accountType === 'current' 


   const handleCreate = async () => {
    setSaving(true) //turn on saving 
    setError('')
    try {
        await onAdd({
            id : Date.now() ,
            name: form.accountName,
            type: form.accountType,
            balance: Number(form.startingBalance),
            overdraftLimit: form.accountType === 'current' ?  Number(form.overdraftLimit || 0):0
        }) //build the acc obj and send it to App with onAdd. 
        //await tells it to wait until App has finished saving before continuing
        
        setMessage('Account added successfully!')
        setForm(emptyForm)
        setTimeout(() => 
            setMessage(''), 3000) //hide the message after 3 secs
        } catch (err) { //if anything failed , catch will show an error but leaves form as is so user doesnt lose their input 
            setError('Failed to add account. Please try again.') 
        } finally {
            setSaving(false)
        }
    }
      //handle create should also navigate to acc dasboard after saving  



    return(
        <div> 
    <Header/> 

    {message && (
        <p role="status" className="success-msg">
            {message}
        </p>
    )}

<div className="form-field-group" >
    <label htmlFor="accountType" className="field-label">
        Account type*
    </label>
    <Select 
    items={typeItems}
    value={form.accountType || undefined}
    onChange={handleSelectChange}> 
    <SelectTrigger id="accountType" className="field-input">
        <SelectValue placeholder="Select account type" />
    </SelectTrigger>
    <SelectContent>
        <SelectGroup>
            <SelectLabel>Account type</SelectLabel>
            {typeItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                    {item.label}
                </SelectItem>
            ))}
        </SelectGroup>
    </SelectContent>
    </Select>
  </div>

    <div className="form-field-group" >
        <label htmlFor="accountName" className="field-label">
            Account name*
        </label>
        <input 
        id="accountName"
        name="accountName"
        type="text"
        value={form.accountName}
        onChange={handleChange}
        placeholder="eg. Everyday spending"
        className="field-input"
        required
        />
    </div>

   <div className="form-field-group" >
        <label htmlFor="startingBalance" className="field-label">
            Initial balance*
        </label>
        <input 
        id="startingBalance"
        name="startingBalance"
        type="number"
        value={form.startingBalance}
        onChange={handleChange}
        placeholder="R0.00"
        className="field-input"
        required
        />
    </div>

       <div className="form-field-group" >
        <label htmlFor="overdraftLimit" className="field-label">
            Overdraft limit(optional)
        </label>
        <input 
        id="overdraftLimit"
        name="overdraftLimit"
        type="number"
        value={form.overdraftLimit}
        onChange={handleChange}
        placeholder={isSavings ? "Not applicable for savings account" : "R0.00"}
        className="field-input disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60" //style changes when disabled
        disabled={isSavings} //disable the field if savings is selected
        />
    </div>
  
  {/*while the form is incomplete show this message */}
  {!isFormComplete && (
    <p className="text-sm text-muted-foreground">
        Fill in all required fields to enable Create Account button.
    </p>
)}

{error && (
    <p role="alert" className="error-msg">
        {error}
    </p>
)}

<Button 
type="button"
onClick={handleCreate}
disabled={!isFormComplete || saving}>
  {saving ? "Creating..." : "Create Account"}
</Button>
{/*the button is disabled if form incomplete or if saving is in progress
the label changes to "Creating..." while saving is in progress*/}


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


export default AddAccount