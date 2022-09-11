
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

   let test

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
               <div className="userInfoItem" key={index}>
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
         for (const index in userInfo.data.tests) {
            test = (userInfo.data.tests[index])
            return (
               <div className="userInfoItem" key={index}>
                  <p className="userInfoHeading"> Test {index * 1 + 1} </p>
                  <p className="userInfoText">Date: {new Date(test.date).toLocaleDateString()}</p>
                  <p className="userInfoText">Skills:</p>
                  <div className="skillContainer">
                     <SkillTestList />
                  </div>                  
                  <button id="detailsButton">See details</button>
               </div>
            )
         }
      } else {

         return (
            <div></div>
         )
      }
   }

   // render a skill tag for each test skill
   const SkillTestList = () => {
      if (test.skills.length > 0) {
         return (
            test.skills.map((skill, index) => (
               <p key={index} className="skillTag">{skill.title}</p>
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
            <div className="userInfoItem">
               <p className="userInfoName">{userInfo.data.first_name} {userInfo.data.last_name}</p>
            </div>
            <div className="userInfoItem">
               <p className="userInfoRole">Profile type: applicant</p>
               <p className="userInfoText">Date of creation: {new Date(userInfo.data.created_at).toLocaleDateString()}</p>
            </div>
            <div className="userInfoItem">
               <p className="userInfoHeading">CONTACT INFORMATION:</p>
               <p className="userInfoText">Email: {userInfo.data.email}</p>
               <p className="userInfoText">Phone: {userInfo.data.phone}</p>
            </div>
            <div className="userInfoItem">
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
            <div className="userInfoItem">
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
            <div className="userInfoItem">
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