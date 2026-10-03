import {useState} from 'react'

const Header = () => {
    return(
 <header>
     <h1> Budget Setup </h1> 
     <img src="" alt="stego logo" width="50px"/>
     </header>
    )
}

const Button =({reset,done}) => {
    return(
        <div>
    <button type ="button" onClick={reset} > Reset </button>
    <button type ="button" onClick={done} > Done </button>
        </div>
    )
}



function App() {
  
  return (
    <>
      <Header/>
    </>
  )
}

export default App