
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userData, registerUser } from "../userSlice"
import "./Register.scss"

const Register = (props) => {
   const dispatch = useDispatch()
   const userInfo = useSelector(userData)

   const [register, setRegister] = useState({
      role: '',
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      phone: '',
      title: '',
      description: '',
      isError: false,
      message: ''
   })

   // handler to update hook with info from form fields
   const handleInput = (event) => {
      setRegister({
         ...register,
         [event.target.name]: event.target.value
      })
   }

   // test if the info stored in hook is correct and register user in that case
   const userRegister = (event) => {
      event.preventDefault()

      setRegister({
         ...register,
         isError: false,
         message: ''
      })

      dispatch(registerUser(register.role, register.lastName, register.firstName, register.email, register.password, register.phone, register.title, register.description))
   }

   return (
      <div id="Register">
         <div className="mainBox">
            <p>Create new account</p>

            <form onSubmit={userRegister}>
               <div className="registerItem">
                  <label className="registerLabel">Role</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="role" />
               </div>

               <div className="registerItem">
                  <label className="registerLabel">Last name</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="lastName" />
               </div>

               <div className="registerItem">
                  <label className="registerLabel">First name</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="firstName" />
               </div>

               <div className="registerItem">
                  <label className="registerLabel">Email</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="email" />
               </div>

               <div className="registerItem">
                  <label className="registerLabel">Password</label>
                  <input className="registerInput" onChange={handleInput} type="password" name="password" />
               </div>

               <div className="registerItem">
                  <label className="registerLabel">Title</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="title" />
               </div>

               <div className="registerItem">
                  <label className="registerLabel">Phone</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="phone" />
               </div>

               <div className="registerItem">
                  <label className="registerLabel">Description</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="description" />
               </div>

               <div className="registerItem">
                  <button className="registerSubmit" type="submit">Register</button>
               </div>
            </form>

            <p className="errorMessage">{register.isError ? register.message : ''}</p>
            <p className="errorMessage">{userInfo.isError ? userInfo.errorMessage : userInfo.successMessage}</p>

         </div>
      </div>
   )
}

export default Register