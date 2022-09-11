
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../../User/userSlice";
import { selectSkill } from "../skillSlice";
import './UpdateSkill.scss'

const UpdateSkill = () => {
    const userInfo = useSelector(userData)
    const skillInfo = useSelector(selectSkill)
    const navigate = useNavigate()

    useEffect(() => {
        const checkUser = () => {
            return (
                (userInfo.data.id == skillInfo.pivot.user_id) && (skillInfo.pivot.creator)
            )
        }
        if (!userInfo?.data || skillInfo == "" || !checkUser()) {
            navigate('/')
         }
    }, [])

    return(
        <div id="UpdateSkill">
           <div className="mainBox">
              <p>UPDATE SKILL PAGE</p>
           </div>
        </div>
     )
}

export default UpdateSkill