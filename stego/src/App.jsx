import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Category from './Category.jsx'  
import Overview from './Overview.jsx'

function App() {
  const [count, setCount] = useState(0) 

  return ( 
    <>    
      <Category /> 

    </> 
  )
}

export default App
