import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../../User/userSlice";
import './RegisterSkill.scss'

const RegisterSkill = () => {
   const userInfo = useSelector(userData)
   const navigate = useNavigate()
   const recruiterRoleId = "5695fbbd-4675-4b2a-b31d-603252c21c94"

   useEffect(() => {
      if (!userInfo?.data || userInfo?.data.role_id != recruiterRoleId) {
         navigate('/')
      }
   }, [])

   return (
      <div id="RegisterSkill">
         <div className="mainBox">
            <p>REGISTER SKILL PAGE</p>
         </div>
      </div>
   )
}

export default RegisterSkill