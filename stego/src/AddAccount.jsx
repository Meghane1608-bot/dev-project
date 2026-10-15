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

//either current or savings account
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

const AddAccount = () => {
    return(
        <div> 
<Header/> 


        </div>
    )
}


export default AddAccount