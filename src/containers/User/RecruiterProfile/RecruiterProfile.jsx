
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userData } from "../userSlice"
import "./RecruiterProfile.scss"

const RecruiterProfile = () => {
   const recruiterRoleId = "5695fbbd-4675-4b2a-b31d-603252c21c94"
   const userInfo = useSelector(userData)
   const navigate = useNavigate()

   useEffect(() => {
      if (!userInfo?.data) {
         navigate('/')
      } else if (userInfo.data.role_id != recruiterRoleId) {
         navigate('/profile-applicant')
      }
   }, [])

   return (
      <div id="RecruiterProfile">
         <div className="mainBox">
            <p>MY PROFILE PAGE - RECRUITER</p>
         </div>
      </div>
   )
}

export default RecruiterProfile