export default function Login () {
return (
 <div className ="login-page">
 <div className = "login-container">
<h1> LOGIN</h1>
<form>
    <div className = "login-field">
        <label htmlFor ="username">Username</label>
        <input
        id ="username"
        name="username"
        type ="text"
        placeholder = "ENTER YOUR USERNAME"
        required 
        />
    </div> 
    <div className = "login-field">
        <label htmlFor ="password">Password</label>
        <input 
        id ="password"
        name ="password"
        type ="password" 
        placeholder = "ENTER YOUR PASSWORD"
        required 
        />
        <a href = "/forgot-password" className ="forgot-button">
        Forgot password ?
        </a>
    </div>
     <button className ="login-button" type ="submit">
        log in
     </button>
     </form>
     </div>
     </div>  
    ) 
} 