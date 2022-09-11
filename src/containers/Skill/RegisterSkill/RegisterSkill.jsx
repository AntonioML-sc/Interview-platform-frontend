import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { evalField } from "../../../utils";
import { userData } from "../../User/userSlice";
import { registerSkill, selectSkill } from "../skillSlice";
import './RegisterSkill.scss'

const RegisterSkill = () => {
   const userInfo = useSelector(userData)
   const skillInfo = useSelector(selectSkill)
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

   // test if the info stored is correct and register skill in that case
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
                setTimeout(() => navigate("/"), 1000)
            }
        }
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