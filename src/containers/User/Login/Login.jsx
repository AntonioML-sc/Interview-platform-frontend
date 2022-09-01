
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { evalField } from "../../../utils"
import { loginUser, userData } from "../userSlice"
import "./Login.scss"

const Login = () => {
   const [credentials, setCredentials] = useState({
      email: '',
      password: ''
   })
   const [msgError, setMsgError] = useState({
      isError: false,
      message: ''
   })
   const userInfo = useSelector(userData)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   // handler to update hook with info from form fields
   const handleInput = (event) => {
      setCredentials({
         ...credentials,
         [event.target.name]: event.target.value
      })
   }

   // test if the info stored in hook is correct and login user in that case
   const userLogin = (event) => {
      event.preventDefault()

      // function to set an error with custon message in msgError hook
      const setLoginError = (value, message) => {
         setMsgError({
            isError: value,
            message: message
         });
      }

      // form inputs to validate
      const validations = [
         ['email', credentials.email, 'Invalid email format'],
         ['password', credentials.password, 'Password must be at least 8 characters long and include a letter, a capital letter, a number and a special character']
      ]

      // apply validations and login user if everything is ok
      for (let index in validations) {
         if (!evalField(validations[index][0], validations[index][1])) {
            setLoginError(true, validations[index][2])
            return
         } else if (index == validations.length - 1) {
            setLoginError(false, '')
            dispatch(loginUser({
               email: credentials.email.toLowerCase,
               password: credentials.password
            }))
            setTimeout(() => navigate("/"), 1000)
         }
      }
   }

   return (
      <div id="Login">
         <div className="mainBox">
            <p>Login</p>
            <form onSubmit={userLogin}>
               <div className="loginItem">
                  <label className="loginLabel">Email</label>
                  <input className="loginInput" onChange={handleInput} type="text" name="email" />
               </div>

               <div className="loginItem">
                  <label className="loginLabel">Password</label>
                  <input className="loginInput" onChange={handleInput} type="password" name="password" />
               </div>

               <div className="loginItem">
                  <button className="loginSubmit" type="submit">Login</button>
               </div>
            </form>
            <p className="errorMessage">{msgError.isError ? msgError.message : ''}</p>
            <p className="errorMessage">{userInfo.isError ? userInfo.errorMessage : userInfo.successMessage}</p>
         </div>
      </div>
   )
}

export default Login