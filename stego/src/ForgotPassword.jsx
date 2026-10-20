export default function ForgotPassword() { 

return( 
    <div className ="forgot-page">
        <div className ="Forgot-container">
            <h1> Forgot Password ?</h1>
            <p> Update password for enhanced account security</p>
        </div>

        <form>
            <div className ="forgot-field">
            <label htmlFor ="new"> New Password</label>
            <input id ="new" type ="password"/> 
            </div>

            <p className = "password-rules">
                Password must contain at least 8 characters,
                one uppercase letter and one number.
            </p>
            <div className ="forgot-buttons">
            <button type ="reset"> Discard</button> 
            <button type ="button"> Apply</button>
            </div>
        </form>
        </div> 
    
)
}