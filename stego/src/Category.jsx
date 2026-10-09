import {ArrowLeft} from "lucide-react" 
export default function Category() { 
  return ( 
    <div className = "min-h-screen bg-amber-50 p-6"  > 
    <button type ="button" aria-label = "Go back"> <ArrowLeft size ={24} /></button>  {/* used Schadni button component */}
    <h1 className="text-3xl font-bold text-teal-700"> 
    Category setup </h1>  
    <div className="bg-gray-100 rounded-2xl p-6">
    <h2>Select category type </h2>   

    <div className ="flex gap-4">  
     <button className="bg-white border border-gray-300 rounded-lg px-6 py-3">
      Income</button> 
    <button className="bg-white border border-gray-300 rounded-lg px-6 py-3"> 
      Expenditure</button> 
    </div> 
    <h2> Select category name</h2> 
    <select className="bg-white border border-gray-300 rounded-lg p-3 w-full"> 
    <option> Groceries</option> 
    <option> Entertainment</option> 
    <option> Transport</option>
    <option> NSFAS </option>
    </select> 
    <div className ="flex justify-end">
    <button type ="button" className = "bg-white border border-gray-300 rounded-lg px-4 py-2"> 
      RESET</button> 
      </div> 
      <button type ="button" className = "bg-orange-500 text-white rounded-lg p-3 w-full"> 
        DONE 
      </button>
    </div> 
    </div> 
 


)
}
