import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../../User/userSlice";
import { selectSkill } from "../skillSlice";
import './RegisterSkill.scss'

const RegisterSkill = () => {
   const userInfo = useSelector(userData)
   const skillInfo = useSelector(selectSkill)
   const navigate = useNavigate()
   const recruiterRoleId = "5695fbbd-4675-4b2a-b31d-603252c21c94"

   useEffect(() => {
      if (!userInfo?.data || userInfo?.data.role_id != recruiterRoleId) {
         navigate('/')
      }
   }, [])

   const [register, setRegister] = useState({
      title: '',
      description: ''
   })

   // handler to update hook with info from form fields
   const handleInput = (event) => {
      setRegister({
         ...register,
         [event.target.name]: event.target.value
      })
   }

   // test if the info stored is correct and register skill in that case
   const skillRegister = async (event) => {
      return
   }

   return (
      <div id="RegisterSkill">
         <div className="mainBox">
            <p>Register a new skill</p>
               <form onSubmit={skillRegister}>
                  <div className="registerItem">
                     <label className="registerLabel">Title</label>
                     <input className="registerInput" onChange={handleInput} type="text" name="title" />
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
               <p className="errorMessage">{skillInfo.isError ? skillInfo.errorMessage : skillInfo.successMessage}</p>
         </div>
      </div>
   )
}

export default RegisterSkill