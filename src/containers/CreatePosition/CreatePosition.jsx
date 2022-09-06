
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../User/userSlice";
import './CreatePosition.scss'

const CreatePosition = () => {
    const userInfo = useSelector(userData)
    const navigate = useNavigate()
    const recruiterRoleId = "5695fbbd-4675-4b2a-b31d-603252c21c94"

    useEffect(() => {
        if (!userInfo?.data) {
            navigate('/')
        } else if (userInfo?.data.role_id != recruiterRoleId) {
            navigate('/')        
        }
    }, [])

    return (
      <div id="CreatePosition">
         <div className="wellcomeMessageBox">
            <p>CREATE POSITION PAGE</p>
         </div>
      </div>
    )
}

export default CreatePosition