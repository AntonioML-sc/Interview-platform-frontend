
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../../User/userSlice";
import { selectCompany } from "../companySlice";
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
      return
   }

      return (
         <div id="RegisterCompany">
            <div className="mainBox">
               <p>Register a company</p>
               <form onSubmit={companyRegister}>
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
                     <input className="registerInput" onChange={handleInput} type="text" name="email" />
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
               <p className="errorMessage">{companyInfo.isError ? companyInfo.errorMessage : companyInfo.successMessage}</p>
            </div>
         </div>
      )
   }

   export default RegisterCompany