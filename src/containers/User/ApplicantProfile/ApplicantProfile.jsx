
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userData } from "../userSlice"
import "./ApplicantProfile.scss"

const ApplicantProfile = () => {
   const recruiterRoleId = "5695fbbd-4675-4b2a-b31d-603252c21c94"
   const userInfo = useSelector(userData)
   const navigate = useNavigate()

   useEffect(() => {
      console.log(userInfo)
      if (!userInfo?.data) {
         navigate('/')
      } else if (userInfo.data.role_id == recruiterRoleId) {
         navigate('/profile-recruiter')
      }
   }, [])

   
   // ------------ RENDER FUNCTIONS ------------ \\

   // render a position card for each position stored in positionsList in redux slice
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

   // render personal info
   const UserInfo = () => {
      return (
         <div className="userInfo">
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
                  <SkillList/>
               </div>
               <p className="userInfoText">Description:</p>
               <p className="userInfoText">{userInfo.data.description}</p>
            </div>
         </div>
      )
   }

   return (
      <div id="ApplicantProfile">
         <div className="mainBox">
            <UserInfo />
         </div>
      </div>
   )
}

export default ApplicantProfile