
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
      userSkillList: [],
      otherSkillList: [],
      searchWord: "",
      myTimeOut: 0
   })

   // data to update user
   const [register, setRegister] = useState({
      title: '',
      description: '',
      phone: '',
      email: '',
      isError: false,
      message: ''
   })

   useEffect(() => {
      if (!userInfo?.data) {
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

   // handler to test if the info stored in hook is correct and update user profile in that case
   const userUpdate = async (event) => {
   }

   // handler for skill search
   const handleChange = (event) => {
   }

   // add the clicked skill tag from general skill list to user skill list
   const addToUserSkillList = (skill) => {
   }

   // remove the clicked skill tag from position required skill list
   const removeFromUserSkillList = (skill) => {
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

   // renders positionSkillList
   const UserSkillList = () => {
      if (skillLists.userSkillList.length > 0) {

         return (
            skillLists.positionSkillList.map((skill, index) => (
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
                  <label className="registerLabel">Title</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="title" />
               </div>
               <div className="registerItem">
                  <label className="registerLabel">Phone</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="phone" />
               </div>
               <div className="registerItem">
                  <label className="registerLabel">Email</label>
                  <input className="registerInput" onChange={handleInput} type="email" name="email" />
               </div>
               <div className="registerItem">
                  <label className="registerLabel">Description</label>
                  <input className="registerInput" onChange={handleInput} type="text" name="description" />
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