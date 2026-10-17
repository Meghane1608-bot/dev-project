import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, User, CreditCard,  Calculator  } from 'lucide-react'
import {useState} from 'react'


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
        <h1 className="account-title"> Accounts Overview </h1>
      </div>
      <img src="" alt="stego logo" className="stego-logo" width="50px" />
    </header>
  )
}