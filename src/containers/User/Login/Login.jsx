
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginUser, userData } from "../userSlice"
import "./Login.scss"

const Login = () => {
   const [credentials, setCredentials] = useState({
      email: '',
      password: ''
   })
   const [msgError, setMsgError] = useState("")
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

      setMsgError('')

      dispatch(loginUser({
         email: credentials.email,
         password: credentials.password
      }))

      setTimeout(() => {
         navigate("/")
      }, 1000)
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
            
            <p className="errorMessage">{msgError}</p>
            <p className="errorMessage">{userInfo.isError ? userInfo.errorMessage : userInfo.successMessage}</p>
         </div>
      </div>
   )
}

export default Login