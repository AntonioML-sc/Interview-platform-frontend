
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { evalField } from "../../../utils"
import { userData } from "../../User/userSlice"
import { createTest, selectUserId } from "../skillTestSlice"
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
      myTimeOut: 0,
      lastChange: ""
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
      const fetchSkills = async () => {
         try {
            if (skillLists.searchWord == "") {
               await axios.get('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/skills/get-all')
                  .then(resp => {
                     const showList = resp.data.data.filter(skill => { return skillLists.positionSkillList.every(sk => { return sk.id != skill.id }) })
                     setSkillLists({
                        ...skillLists,
                        otherSkillList: showList
                     })
                  })
            } else {
               await axios.get(`https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/skills/get-by-title/${skillLists.searchWord}`)
                  .then(resp => {
                     const showList = resp.data.data.filter(skill => { return skillLists.positionSkillList.every(sk => { return sk.id != skill.id }) })
                     setSkillLists({
                        ...skillLists,
                        otherSkillList: showList
                     })
                  })
            }
         } catch (error) {
            console.log(error)
         }
      }
      fetchSkills()
   }, [skillLists.searchWord, skillLists.lastChange])

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
         ['date', register.date, 'Invalid date format'],
         ['time', register.time, 'Invalid time format']
      ]

      // build an array with required skills' ids from array of skills (objects with id inside)
      const makeSkillIdArray = (skillsArray) => {

         return skillsArray.map(value => { return { "id": value.id } })
      }

      // apply evals and register position if everything is ok
      for (let index in validations) {
         if (!evalField(validations[index][0], validations[index][1])) {
            setRegisterError(true, validations[index][2])
            return
         } else if (index == validations.length - 1) {
            setRegisterError(false, '')
            const userToken = userInfo?.token
            const skillIdsArray = makeSkillIdArray(skillLists.positionSkillList)
            const body = {
               date: register.date + " " + register.time,
               examinee_id: userIdInfo,
               skills: skillIdsArray
            }
            dispatch(createTest(body, userToken))
            setTimeout(() => navigate("/"), 1000)
         }
      }
   }

   // handler for skill search
   const handleChange = (event) => {
      if (skillLists.myTimeOut != 0) {
         clearInterval(skillLists.myTimeOut)
      }
      setSkillLists({
         ...skillLists,
         myTimeOut: setTimeout(() => {
            setSkillLists({
               ...skillLists,
               searchWord: event.target.value,
               myTimeOut: 0
            })
         }, 400)
      })
   }

   // add the clicked skill tag from general skill list to position required skill list
   const addToPositionSkillList = (event, skill) => {
      const check = () => {

         return (skillLists.positionSkillList.every(value => { return value.id != skill.id }))
      }
      if (check()) {
         setSkillLists({
            ...skillLists,
            positionSkillList: [...skillLists.positionSkillList, skill],
            lastChange: "in:" + skill.id
         })
      }
   }

   // remove the clicked skill tag from position required skill list
   const removeFromPositionSkillList = (event, skill) => {
      let positionSkills = skillLists.positionSkillList
      for (const key in positionSkills) {
         if (positionSkills[key].id == skill.id) {
            positionSkills.splice(key, 1)
         }
      }

      setSkillLists({
         ...skillLists,
         positionSkillList: positionSkills,
         lastChange: "out:" + skill.id
      })
   }

   // ------------ RENDER FUNCTIONS ------------ \\

   // renders otherSkillList
   const OtherSkillList = () => {
      if (skillLists.otherSkillList?.length > 0) {

         return (
            skillLists.otherSkillList.map((skill, index) => (
               <p key={index} className="skillTag" onClick={event => addToPositionSkillList(event, skill)} >{skill.title}</p>
            ))
         )
      } else {

         return (
            <div></div>
         )
      }
   }

   // renders positionSkillList
   const PositionSkillList = () => {
      if (skillLists.positionSkillList?.length > 0) {

         return (
            skillLists.positionSkillList.map((skill, index) => (
               <p key={index} className="skillTag" onClick={event => removeFromPositionSkillList(event, skill)} >{skill.title}</p>
            ))
         )
      } else {

         return (
            <div></div>
         )
      }
   }

   return (
      <div id="CreateTest">
         <div className="mainBox">
            <p className="formTitle" >Create new test</p>
            <form className="registerForm" onSubmit={testRegister}>
               <div className="registerItem">
                  <label className="registerLabel">Date</label>
                  <input className="registerInput" onChange={handleInput} type="text" placeholder="2022-09-30" name="date" />
               </div>
               <div className="registerItem">
                  <label className="registerLabel">Time</label>
                  <input className="registerInput" onChange={handleInput} type="text" placeholder="17:30:00" name="time" />
               </div>

               <div className="registerItem inColumn">
                  <p className="registerTest">Skills required (click to remove)</p>
                  <div className="testSkillList">
                     <PositionSkillList />
                  </div>
                  <p className="registerText">Click to add skills</p>
                  <div className="otherSkillContainer">
                     <div className="searchBar">
                        <div className="searchBarForm">
                           <input className="inputBox" type="text" name="searchWord" onChange={handleChange} placeholder=" Search"></input>
                        </div>
                     </div>
                     <div className="otherSkillList">
                        <OtherSkillList />
                     </div>
                  </div>
               </div>

               <div className="registerItem">
                  <button className="registerSubmit" type="submit">Register</button>
               </div>
            </form>
            
            <p className="errorMessage">{register.isError ? register.message : ''}</p>
            <p className="errorMessage">{userIdInfo.isError ? userIdInfo.errorMessage : userIdInfo.successMessage}</p>
         </div>
      </div>
   )
}

export default CreateTest;