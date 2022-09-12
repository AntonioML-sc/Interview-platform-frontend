
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userData } from "../../User/userSlice"
import { selectUserId } from "../skillTestSlice"
import "./CreateTest.scss"

const CreateTest = () => {
   const userInfo = useSelector(userData)
   const userIdInfo = useSelector(selectUserId)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   // data related to skill search
   let [skillLists, setSkillLists] = useState({
      positionSkillList: [],
      otherSkillList: [],
      searchWord: "",
      myTimeOut: 0
   })

   // data to register test
   const [register, setRegister] = useState({
      examineeId: '',
      date: '',
      time: '',
      skills: [],
      isError: false,
      message: ''
   })

   useEffect(() => {
      if (!userInfo?.data || !userIdInfo || userIdInfo == "") {
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
   const testRegister = async (event) => {
      return
   }
   
   // handler for skill search
   const handleChange = (event) => {
      return
   }

   return (
      <div id="CreateTest">
         <div className="mainBox">
            <p>Create new test</p>
            <form onSubmit={testRegister}>
               <div className="registerItem">
                  <label className="registerLabel">Date</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="date" />
               </div>
               <div className="registerItem">
                  <label className="registerLabel">Time</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="time" />
               </div>

               <div className="registerItem">
                  <p className="registerLabel">Skills required</p>
               </div>
               <div className="positionSkillList">
                  {/* <PositionSkillList /> */}
               </div>

               <div className="registerItem">
                  <button className="registerSubmit" type="submit">Register</button>
               </div>
            </form>

            <div className="registerItem">
               <p className="registerLabel">Click to add skills</p>
            </div>

            <div className="otherSkillContainer">
               <div className="searchBar">
                  <form className="searchBarForm">
                     <input className="inputBox" type="text" name="searchWord" onChange={handleChange} placeholder=" Search"></input>
                  </form>
               </div>
               <div className="otherSkillList">
                  {/* <OtherSkillList /> */}
               </div>
            </div>

            <p className="errorMessage">{register.isError ? register.message : ''}</p>
            <p className="errorMessage">{userIdInfo.isError ? userIdInfo.errorMessage : userIdInfo.successMessage}</p>
         </div>
      </div>
   )
}

export default CreateTest;