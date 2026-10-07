import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import './BudgetSetup.jsx'
import BudgetSetup from './BudgetSetup.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BudgetSetup onDone={()=>{console.log("Hey")}} />
    </>
  )
}

export default App
