import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { evalField } from "../../../utils";
import { refreshUserData, userData } from "../../User/userSlice";
import { registerSkill, selectSkillState, setSkill, setSkillList } from "../skillSlice";
import './RegisterSkill.scss'

const RegisterSkill = () => {
   const userInfo = useSelector(userData)
   const skillInfo = useSelector(selectSkillState)
   const navigate = useNavigate()
   const dispatch = useDispatch()
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

   // test if the info stored is correct and register skill in that case. Then, reset skills in redux and refresh
   // user data from db (because user skills will have changed)
   const skillRegister = async (event) => {
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
         ['title', register.title, 'Invalid title format'],
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
            dispatch(registerSkill(register.title, register.description, userToken))
            dispatch(setSkill(""))
            dispatch(setSkillList([]))
            dispatch(refreshUserData())
            setTimeout(() => navigate("/skills"), 1000)
         }
      }
   }

   return (
      <div id="RegisterSkill">
         <div className="mainBox">
            <p className="formTitle" >Register a new skill</p>
            <form className="registerForm" onSubmit={skillRegister}>
               <div className="registerItem">
                  <label className="registerLabel">Title</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="title" />
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
            <p className="errorMessage">{skillInfo.isError ? skillInfo.errorMessage : skillInfo.successMessage}</p>
         </div>
      </div>
   )
}

export default RegisterSkill