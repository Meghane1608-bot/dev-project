export default function Category() {
  return (
    <div className = "min-h-screen bg-amber-50 p-6"  > 
    <h1 className="text-3xl font-bold text-teal-700"> 
    Category setup </h1> 
    <div className="bg-gray-100 rounded-2xl p-6">
    <h2>Select category type </h2>  

    <div className ="flex gap-4">  
     <button className="bg-white border border-gray-300 rounded-lg px-6 py-3">
      Income</button> 
    <button>Expenditure</button> 
    </div> 
    <h2> Select category name</h2> 
    <select>
    <option> Groceries</option>
    <option> Entertainment</option> 
    <option> Transport</option>
    <option> NSFAS </option>
    </select> 
    </div> 
    </div> 
 


)
}
