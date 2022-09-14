
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setPosition } from "../../Position/positionsSlice"
import { userData } from "../userSlice"
import "./ApplicantProfile.scss"

const ApplicantProfile = () => {
   const recruiterRoleId = "5695fbbd-4675-4b2a-b31d-603252c21c94"
   const userInfo = useSelector(userData)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   useEffect(() => {
      if (!userInfo?.data) {
         navigate('/')
      } else if (userInfo.data.role_id == recruiterRoleId) {
         navigate('/profile-recruiter')
      }
   }, [])

   // ------------ HANDLERS ------------ \\

   // go to position details on click
   const goToPosition = async (positionId) => {
      await axios.get(`https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/positions/get-by-id/${positionId}`)
         .then(resp => {
            dispatch(setPosition(resp.data.data))
         }).then(resp => {
            navigate('/position-details')
         }).catch(error => {
            console.log(error)
         })
   }

   // go to update profile on click
   const goToUpdateProfile = () => {
      navigate('/profile-update')
   }

   // ------------ RENDER FUNCTIONS ------------ \\

   // render a skill tag for each user skill
   const SkillList = () => {
      if (userInfo?.data.skills.length > 0) {
         return (
            userInfo.data.skills.map((skill, index) => (
               <p key={index} className="skillTag">{skill.title}</p>
            ))
         )
      } else {

         return (
            <div></div>
         )
      }
   }

   // render a position card for each position
   const PositionList = () => {
      if (userInfo?.data.positions.length > 0) {
         return (
            userInfo.data.positions.map((position, index) => (
               <div className="userInfoItem column" key={index}>
                  <p className="userInfoHeading"> {position.title} </p>
                  <p className="userInfoText"> Company: {position.company.name} </p>
                  <p className="userInfoText"> Status: {position.application.status} </p>
                  <button id="detailsButton" onClick={e => goToPosition(position.id)}>See details</button>
               </div>
            ))
         )
      } else {

         return (
            <div></div>
         )
      }
   }

   // render a test card for each test
   const TestList = () => {
      if (userInfo?.data.tests.length > 0) {     
          
         return (
            userInfo.data.tests.map((test, index) => (
               <div className="userInfoItem column" key={index}>                  
                  {test.users[0].id != userInfo.data.id &&
                     <p className="userInfoHeading">Examiner: {test.users[0].first_name} {test.users[0].last_name} | {test.users[0].email}</p>
                  }
                  {test.users[1].id != userInfo.data.id &&
                     <p className="userInfoHeading">Examiner: {test.users[0].first_name} {test.users[0].last_name} | {test.users[0].email}</p>
                  }
                  <p className="userInfoText">Date: {new Date(test.date).toLocaleDateString()}</p>
                  <p className="userInfoText">Time: {new Date(test.date).toLocaleTimeString()}</p>
                  <div className="skillContainer">
                     <SkillTestList data={test.skills} />
                  </div>
               </div>
            ))
         )

      } else {

         return (
            <div></div>
         )
      }
   }

   // render a skill tag for each test skill
   const SkillTestList = (skills) => {
      if (skills.data.length > 0) {

         return (
            skills.data.map((skill, index) => (
               <p key={index} className="skillTag">{skill.title}: <strong>{skill.marks.mark}/10</strong></p>
            ))
         )
      } else {

         return (
            <div></div>
         )
      }
   }

   // render personal info
   const UserInfo = () => {
      return (
         <div className="userInfo">
            <div className="userInfoItem">
               <p className="userInfoSection">MY PROFILE</p>
            </div>
            <div className="userInfoItem row">
               <p className="userInfoName">{userInfo.data.first_name} {userInfo.data.last_name}</p>
               <button id="detailsButton" onClick={goToUpdateProfile}>Update profile</button>
            </div>
            <div className="userInfoItem column">
               <p className="userInfoRole">Profile type: applicant</p>
               <p className="userInfoText">Date of creation: {new Date(userInfo.data.created_at).toLocaleDateString()}</p>
            </div>
            <div className="userInfoItem column">
               <p className="userInfoHeading">CONTACT:</p>
               <p className="userInfoText">Email: {userInfo.data.email}</p>
               <p className="userInfoText">Phone: {userInfo.data.phone}</p>
            </div>
            <div className="userInfoItem column">
               <p className="userInfoHeading">PROFESSIONAL INFORMATION:</p>
               <p className="userInfoText">Title: {userInfo.data.title}</p>
               <p className="userInfoText">Skills:</p>
               <div className="skillContainer">
                  <SkillList />
               </div>
               <p className="userInfoText">Description:</p>
               <p className="userInfoText">{userInfo.data.description}</p>
            </div>
         </div>
      )
   }

   // render positions that user is applying for
   const UserPositions = () => {
      return (
         <div className="userInfo">
            <div className="userInfoItem column">
               <p className="userInfoSection">MY APPLICATIONS</p>
            </div>
            <PositionList />
         </div>
      )
   }

   // render tests that user is implied in
   const UserTests = () => {
      return (
         <div className="userInfo">
            <div className="userInfoItem column">
               <p className="userInfoSection">MY TESTS</p>
            </div>
            <TestList />
         </div>
      )
   }

   if (userInfo?.data) {
      return (
         <div id="ApplicantProfile">
            <div className="mainBox">
               <UserInfo />
               <UserPositions />
               <UserTests />
            </div>
         </div>
      )
   }
   
}

export default ApplicantProfile