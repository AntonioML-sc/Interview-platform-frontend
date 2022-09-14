
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import "./UpdateProfile.scss"

const UpdateProfile = () => {
   const userInfo = useSelector(userData)
   const navigate = useNavigate()

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
                     const showList = resp.data.data.filter(skill => { return skillLists.userSkillList.every(sk => {return sk.id != skill.id}) })
                     setSkillLists({
                        ...skillLists,
                        otherSkillList: showList
                     })
                  })
            } else {
               await axios.get(`https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/skills/get-by-title/${skillLists.searchWord}`)
                  .then(resp => {
                     const showList = resp.data.data.filter(skill => { return skillLists.userSkillList.every(sk => {return sk.id != skill.id}) })
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
      let userSkills = skillLists.userSkillList
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
            <p>Update profile</p>
            <form onSubmit={userUpdate}>
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
               <div className="registerItem">
                  <label className="registerLabel">Description:</label>
                  <input className="registerInput" onChange={handleInput} type="text" value={register.description} name="description" />
               </div>

               <div className="registerItem">
                  <p className="registerLabel">Your skills</p>
               </div>
               <div className="positionSkillList">
                  <UserSkillList />
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
                  <OtherSkillList />
               </div>
            </div>

            <p className="errorMessage">{register.isError ? register.message : ''}</p>
            <p className="errorMessage">{userInfo.isError ? userInfo.errorMessage : userInfo.successMessage}</p>
         </div>
      </div>
   )
}

export default UpdateProfile;