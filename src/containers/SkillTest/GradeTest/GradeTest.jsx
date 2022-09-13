
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userData } from "../../User/userSlice"
import { selectTest } from "../skillTestSlice"
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
      console.log(register)
   }

   // handler to test if the info stored in hook is correct and register position in that case
   const testGrade = async (event) => {
      console.log("register")
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
         </div>
      </div>
   )
}

export default GradeTest;