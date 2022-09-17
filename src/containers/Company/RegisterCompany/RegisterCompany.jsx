
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { evalField } from "../../../utils";
import { refreshUserData, userData } from "../../User/userSlice";
import { clear, registerCompany, selectCompany } from "../companySlice";
import './RegisterCompany.scss'

const RegisterCompany = () => {
   const userInfo = useSelector(userData)
   const companyInfo = useSelector(selectCompany)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const recruiterRoleId = "5695fbbd-4675-4b2a-b31d-603252c21c94"

   useEffect(() => {
      if (!userInfo?.data || userInfo?.data.role_id != recruiterRoleId) {
         navigate('/')
      }
   }, [])

   const [register, setRegister] = useState({
      name: '',
      address: '',
      email: '',
      description: ''
   })

   // handler to update hook with info from form fields
   const handleInput = (event) => {
      setRegister({
         ...register,
         [event.target.name]: event.target.value
      })
   }

   // test if the info stored is correct and register company in that case
   const companyRegister = async (event) => {
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
         ['name', register.name, 'Invalid name format'],
         ['address', register.address, 'Invalid address format'],
         ['email', register.email, 'Invalid email format'],
         ['description', register.description, 'Invalid description format']
      ]

      // apply evals and register position if everything is ok
      for (let index in validations) {
         if (!evalField(validations[index][0], validations[index][1])) {
            setRegisterError(true, validations[index][2])
            return
         } else if (index == validations.length - 1) {
            setRegisterError(false, '')
            const userToken = userInfo?.token
            dispatch(registerCompany(register.name, register.address, register.email, register.description, userToken))
            setTimeout(() => {
               navigate("/")
               dispatch(clear())
               dispatch(refreshUserData())
            }, 2000)
         }
      }
   }

   return (
      <div id="RegisterCompany">
         <div className="mainBox">
            <p className="formTitle" >Register a company</p>
            <form className="registerForm" onSubmit={companyRegister}>
               <div className="registerItem">
                  <label className="registerLabel">Name</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="name" />
               </div>
               <div className="registerItem">
                  <label className="registerLabel">Address</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="address" />
               </div>
               <div className="registerItem">
                  <label className="registerLabel">Email</label>
                  <input className="registerInput" onChange={handleInput} type="email" name="email" />
               </div>
               <div className="registerItem inColumn">
                  <label className="registerLabel">Description</label>
                  <textarea className="registerInput description" onChange={handleInput} type="text" name="description" />
               </div>
               <div className="registerItem">
                  <button className="detailsButton" type="submit">Register</button>
               </div>
            </form>
            <p className="errorMessage">{register.isError ? register.message : ''}</p>
            <p className="errorMessage">{companyInfo.isError ? companyInfo.errorMessage : companyInfo.successMessage}</p>
         </div>
      </div>
   )
}

export default RegisterCompany