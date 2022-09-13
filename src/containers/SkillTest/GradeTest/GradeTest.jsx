
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { evalField } from "../../../utils"
import { refreshUserData, userData } from "../../User/userSlice"
import { gradeTest, selectTest } from "../skillTestSlice"
import "./GradeTest.scss"

const GradeTest = () => {
   const userInfo = useSelector(userData)
   const testInfo = useSelector(selectTest)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   // data to register test
   const [register, setRegister] = useState({})

   useEffect(() => {
      if (!userInfo?.data || !testInfo?.id) {
         navigate('/')
      }
   }, [])

   // ------------ EVENT HANDLERS ------------ \\

   // handler to update hook with info from form fields
   const handleInput = (event) => {
      setRegister({
         ...register,
         [event.target.name]: event.target.value
      })
   }

   // handler to test if the info stored in hook is correct and register position in that case
   const testGrade = async (event) => {
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
      const validations = Object.entries(register).map(value => {return ['one_to_ten', value[1], 'Invalid mark']})

      // apply evals and register position if everything is ok
      for (let index in validations) {
         if (!evalField(validations[index][0], validations[index][1])) {
            setRegisterError(true, validations[index][2])
            return
         } else if (index == validations.length - 1) {
            setRegisterError(false, '')
            const userToken = userInfo?.token
            const body = {skills: Object.entries(register).map(value => {return {id: value[0], mark: value[1]}})}
            dispatch(gradeTest(testInfo.id, body, userToken))
            dispatch(refreshUserData())
            setTimeout(() => navigate("/"), 1000)
         }
      }
   }

   // ------------ RENDER FUNCTIONS ------------ \\

   return (
      <div id="GradeTest">
         <div className="mainBox">
            {testInfo.users[0].id != userInfo.data.id &&
               <p className="title" >Grade test for {testInfo.users[0].first_name} {testInfo.users[0].last_name}</p>
            }
            {testInfo.users[1].id != userInfo.data.id &&
               <p className="title" >Grade test for {testInfo.users[1].first_name} {testInfo.users[1].last_name}</p>
            }
            <form onSubmit={testGrade}>
               {
                  testInfo.skills.map((skill, index) => (
                     <div key={index} className="registerItem">
                        <label className="registerLabel">{skill.title}: </label>
                        <input className="registerInput" onChange={handleInput} type="number" placeholder="0 to 10" name={skill.id} />
                     </div>
                  ))
               }
               <div className="registerItem">
                  <button className="registerSubmit" type="submit">Register</button>
               </div>
            </form>
            
            <p className="errorMessage">{register.isError ? register.message : ''}</p>
            <p className="errorMessage">{testInfo.isError ? testInfo.errorMessage : testInfo.successMessage}</p>
         </div>
      </div>
   )
}

export default GradeTest;