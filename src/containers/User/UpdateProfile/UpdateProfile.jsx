
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { evalField } from "../../../utils";
import { updateProfile, userData } from "../userSlice";
import "./UpdateProfile.scss"

const UpdateProfile = () => {
   const userInfo = useSelector(userData)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   // data related to skill search
   let [skillLists, setSkillLists] = useState({
      userSkillList: userInfo?.data.skills,
      otherSkillList: [],
      searchWord: "",
      myTimeOut: 0,
      lastChange: ""
   })

   // data to update user
   const [register, setRegister] = useState({
      title: userInfo?.data.title,
      description: userInfo?.data.description,
      phone: userInfo?.data.phone,
      email: userInfo?.data.email,
      isError: false,
      message: ''
   })

   useEffect(() => {
      if (!userInfo?.data) {
         navigate('/')
      }
      const fetchSkills = async () => {
         try {
            if (skillLists.searchWord == "") {
               await axios.get('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/skills/get-all')
                  .then(resp => {
                     const showList = resp.data.data.filter(skill => { return skillLists.userSkillList.every(sk => { return sk.id != skill.id }) })
                     setSkillLists({
                        ...skillLists,
                        otherSkillList: showList
                     })
                  })
            } else {
               await axios.get(`https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/skills/get-by-title/${skillLists.searchWord}`)
                  .then(resp => {
                     const showList = resp.data.data.filter(skill => { return skillLists.userSkillList.every(sk => { return sk.id != skill.id }) })
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

   // handler to test if the info stored in hook is correct and update user profile in that case
   const userUpdate = async (event) => {
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
         ['phone', register.phone, 'Invalid phone format'],
         ['email', register.email, 'Invalid email format'],
         ['description', register.description, 'Invalid description format'],
      ]

      // function to build an array of objects with skills ids from an array of skills
      const makeSkillIdArray = (skillsArray) => {

         return skillsArray.map(value => { return { "id": value.id } })
      }

      // apply evals and register position if everything is ok
      for (let index in validations) {
         if (!evalField(validations[index][0], validations[index][1])) {
            setRegisterError(true, validations[index][2])
            return
         } else if (index == validations.length - 1) {
            setRegisterError(false, 'validation ok')
            const userNewSkills = makeSkillIdArray(skillLists.userSkillList)
            const userInitialSkills = makeSkillIdArray(userInfo.data.skills)
            const skillsToAttach = userNewSkills.filter(skill => { return userInitialSkills.every(sk => { return sk.id != skill.id }) })
            const skillsToDetach = userInitialSkills.filter(skill => { return userNewSkills.every(sk => { return sk.id != skill.id }) })
            const body = {
               title: register.title,
               phone: register.phone,
               email: register.email,
               description: register.description,
               skills_to_attach: skillsToAttach,
               skills_to_detach: skillsToDetach
            }
            dispatch(updateProfile(body))
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
         }, 400)
      })
   }

   // add the clicked skill tag from general skill list to user skill list
   const addToUserSkillList = (skill) => {
      const check = () => {

         return (skillLists.userSkillList.every(value => { return value.id != skill.id }))
      }
      if (check()) {
         setSkillLists({
            ...skillLists,
            userSkillList: [...skillLists.userSkillList, skill],
            lastChange: "in:" + skill.id
         })
      }
   }

   // remove the clicked skill tag from position required skill list
   const removeFromUserSkillList = (skill) => {
      let userSkills = [].concat(skillLists.userSkillList)
      for (const key in userSkills) {
         if (userSkills[key].id == skill.id) {
            userSkills.splice(key, 1)
         }
      }

      setSkillLists({
         ...skillLists,
         userSkillList: userSkills,
         lastChange: "out:" + skill.id
      })
   }

   // ------------ RENDER FUNCTIONS ------------ \\

   // renders otherSkillList
   const OtherSkillList = () => {
      if (skillLists.otherSkillList?.length > 0) {

         return (
            skillLists.otherSkillList.map((skill, index) => (
               <p key={index} className="skillTag" onClick={event => addToUserSkillList(skill)} >{skill.title}</p>
            ))
         )
      } else {

         return (<div></div>)
      }
   }

   // renders userSkillList
   const UserSkillList = () => {
      if (skillLists.userSkillList.length > 0) {

         return (
            skillLists.userSkillList.map((skill, index) => (
               <p key={index} className="skillTag" onClick={event => removeFromUserSkillList(skill)} >{skill.title}</p>
            ))
         )
      } else {

         return (<div></div>)
      }
   }

   return (
      <div id="UpdateProfile">
         <div className="mainBox">
            <p className="formTitle">Update profile</p>
            <form className="registerForm" onSubmit={userUpdate}>
               <div className="registerItem">
                  <label className="registerLabel">Title:</label>
                  <input className="registerInput" onChange={handleInput} type="text" value={register.title} name="title" />
               </div>
               <div className="registerItem">
                  <label className="registerLabel">Phone:</label>
                  <input className="registerInput" onChange={handleInput} type="text" value={register.phone} name="phone" />
               </div>
               <div className="registerItem">
                  <label className="registerLabel">Email:</label>
                  <input className="registerInput" onChange={handleInput} type="email" value={register.email} name="email" />
               </div>
               <div className="registerItem inColumn">
                  <label className="registerLabel">Description:</label>
                  <textarea className="registerInput description" onChange={handleInput} type="text" value={register.description} name="description" />
               </div>

               <div className="registerItem inColumn">
                  <p className="registerText">Your skills (Click to remove)</p>
                  <div className="positionSkillList">
                     <UserSkillList />
                  </div>

                  <p className="registerLabel">Click to add skills</p>
                  <div className="otherSkillContainer">
                     <div className="searchBar">
                        <form className="searchBarForm">
                           <input className="inputBox" type="text" name="searchWord" onChange={handleChange} placeholder=" Search"></input>
                        </form>
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
            <p className="errorMessage">{userInfo.isError ? userInfo.errorMessage : userInfo.successMessage}</p>
         </div>
      </div>
   )
}

export default UpdateProfile;