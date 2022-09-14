
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import "./UpdateProfile.scss"

const UpdateProfile = () => {
   const userInfo = useSelector(userData)
   const navigate = useNavigate()

   useEffect(() => {
      if (!userInfo?.data) {
         navigate('/')
      }
   }, [])

   return (
      <div id="UpdateProfile">
         <div className="mainBox">
            <p>UPDATE PROFILE PAGE</p>
         </div>
      </div>
   )
}

export default UpdateProfile;