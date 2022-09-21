
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { evalField } from "../../../utils";
import { userData } from "../../User/userSlice";
import { registerPosition, selectPosition } from "../positionsSlice";
import './CreatePosition.scss'

const CreatePosition = () => {
   const userInfo = useSelector(userData)
   const positionsInfo = useSelector(selectPosition)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const recruiterRoleId = "5695fbbd-4675-4b2a-b31d-603252c21c94"

   // data related to skill search
   let [skillLists, setSkillLists] = useState({
      positionSkillList: [],
      otherSkillList: [],
      searchWord: "",
      myTimeOut: 0,
      lastChange: ""
   })

   // data to register position
   const [register, setRegister] = useState({
      title: '',
      description: '',
      companyName: '',
      location: '',
      mode: '',
      salary: '',
      isError: false,
      message: ''
   })

   useEffect(() => {
      if (!userInfo?.data || userInfo?.data.role_id != recruiterRoleId) {
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
   const positionRegister = async (event) => {
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
         ['company_name', register.companyName, 'Invalid company name format'],
         ['location', register.location, 'Invalid location format'],
         ['mode', register.mode, 'Invalid mode format'],
         ['salary', register.salary, 'Invalid salary format'],
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
            dispatch(registerPosition(register.title, register.description, register.companyName, register.location, register.mode, register.salary, userToken, skillIdsArray))
            setTimeout(() => navigate("/"), 3000)
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
         }, 500)
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

         return (<div></div>)
      }
   }

   // renders positionSkillList
   const PositionSkillList = () => {
      if (skillLists.positionSkillList.length > 0) {

         return (
            skillLists.positionSkillList.map((skill, index) => (
               <p key={index} className="skillTag" onClick={event => removeFromPositionSkillList(event, skill)} >{skill.title}</p>
            ))
         )
      } else {

         return (<div></div>)
      }
   }

   return (
      <div id="CreatePosition">
         <div className="mainBox">
            <p className="formTitle" >Register new position</p>
            <form className="registerForm" onSubmit={positionRegister}>
               <div className="registerItem">
                  <label className="registerLabel">Title</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="title" />
               </div>
               <div className="registerItem">
                  <label className="registerLabel">Company name</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="companyName" />
               </div>
               <div className="registerItem">
                  <label className="registerLabel">Location</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="location" />
               </div>
               <div className="registerItem">
                  <label className="registerLabel">Mode</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="mode" />
               </div>
               <div className="registerItem">
                  <label className="registerLabel">Salary</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="salary" />
               </div>
               <div className="registerItem inColumn">
                  <label className="registerLabel">Description</label>
                  <textarea className="registerInput description" onChange={handleInput} type="text" name="description" />
               </div>

               <div className="registerItem inColumn">
                  <p className="registerText">Skills required (Click to remove)</p>
                  <div className="positionSkillList">
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
                  <button className="detailsButton" type="submit">Register</button>
               </div>
            </form>


            <p className="errorMessage">{register.isError ? register.message : ''}</p>
            <p className="errorMessage">{positionsInfo.isError ? positionsInfo.errorMessage : positionsInfo.successMessage}</p>
         </div>
      </div>
   )
}

export default CreatePosition