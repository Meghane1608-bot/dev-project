import React from 'react'
 import { useState } from 'react'
 import { ChevronLeft, Home, User, CreditCard, Receipt } from 'lucide-react'


 const Header = () => {
   return (
     <header className="budget-header">
       <div className="budget-header-left">
         <button
          type="button" className="back-btn">
           <ChevronLeft className="back-icon" />
         </button>
         <h1 className="budget-title">Budget Dashboard </h1>
       </div>
       <img src="" alt="stego logo" className="stego-logo" width="50px" />
     </header>
   )
 }