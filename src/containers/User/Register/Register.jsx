
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userData, registerUser } from "../userSlice"
import { evalField } from "../../../utils"
import { useNavigate } from "react-router-dom"
import "./Register.scss"

const Register = (props) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
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
   const userRegister = async (event) => {
      event.preventDefault()

      // function to set an error with custon message in register hook
      const setRegisterError = (value, message) => {
         setRegister({
            ...register,
            isError: value,
            message: message
         });
      }

      // form inputs to validate
      const validations = [
         ['role', register.role, 'You must select a profile type'],
         ['last_name', register.lastName, 'Introduce a valid last name'],
         ['first_name', register.firstName, 'Introduce a valid first name'],
         ['email', register.email, 'Invalid email format'],
         ['password', register.password, 'Password must be at least 8 characters long and include a letter, a capital letter, a number and a special character'],
         ['phone', register.phone, 'Invalid phone format'],
         ['title', register.title, 'Invalid title format'],
      ]

      // apply evals and register user if everything is ok
      for (let index in validations) {
         if (!evalField(validations[index][0], validations[index][1])) {
            setRegisterError(true, validations[index][2])
            return
         } else if (index == validations.length - 1) {
            setRegisterError(false, '')
            dispatch(registerUser(register.role.toLowerCase(), register.lastName, register.firstName, register.email.toLowerCase(), register.password, register.phone, register.title, register.description))
            setTimeout(() => navigate("/"), 3000)
         }
      }
   }

   return (
      <div id="Register">
         <div className="mainBox">
            <p className="formTitle" >Register now and start to enjoy our advanced features</p>
            <form className="registerForm" onSubmit={userRegister}>
               <div className="registerItem">
                  <label className="registerLabel">Profile type</label>
                  <select className="registerInput" defaultValue={"undefined"} onChange={handleInput} name="role">
                     <option value="undefined" disabled>Choose a profile</option>
                     <option value="applicant">Applicant</option>
                     <option value="recruiter">Recruiter</option>
                  </select>
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
                  <input className="registerInput" onChange={handleInput} type="email" name="email" />
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
               <div className="registerItem inColumn">
                  <label className="registerLabel">Description</label>
                  <div className="descriptionContainer">
                     <textarea className="registerInput description" onChange={handleInput} type="text" name="description" />
                  </div>
               </div>
               <div className="registerItem">
                  <button className="detailsButton" type="submit">Register</button>
               </div>
            </form>
            <p className="errorMessage">{register.isError ? register.message : ''}</p>
            <p className="errorMessage">{userInfo.isError ? userInfo.errorMessage : userInfo.successMessage}</p>
         </div>
      </div>
   )
}

export default Register