import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, User, CreditCard,  Calculator  } from 'lucide-react'
import {useState} from 'react'



const Header = () => {
    return(
        <div> 
            <h1 className="accounts-header"> Create Account </h1>
            <img src="" alt="stego logo" className="stego-logo" width="50px" />
        </div>
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
     




    return(
        <div> 
{/*<Header/> */}



        </div>
    )
}


export default AddAccount