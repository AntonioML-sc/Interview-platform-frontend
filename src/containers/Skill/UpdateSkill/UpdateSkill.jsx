
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { evalField } from "../../../utils";
import { userData } from "../../User/userSlice";
import { selectSkill, setSkill, setSkillList, updateSkill } from "../skillSlice";
import './UpdateSkill.scss'

const UpdateSkill = () => {
   const userInfo = useSelector(userData)
   const skillInfo = useSelector(selectSkill)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   let [skillData, setSkillData] = useState({
      id: "",
      title: "",
      description: ""
   })

   useEffect(() => {
      const checkUser = () => {
         return (
            (userInfo.data.id == skillInfo.pivot.user_id) && (skillInfo.pivot.creator)
         )
      }
      if (!userInfo?.data || skillInfo == "" || !checkUser()) {
         navigate('/')
      } else {
         setSkillData({
            ...skillData,
            id: skillInfo.id,
            title: skillInfo.title,
            description: skillInfo.description
         })
      }
   }, [])

   // ------------ HANDLERS ------------ \\

   // handler to update hook with info from form fields
   const handleInput = (event) => {
      setSkillData({
         ...skillData,
         [event.target.name]: event.target.value
      })
   }

   // test if the info stored is correct and update skill in that case
   const skillUpdate = (event) => {
      event.preventDefault()

      // function to set an error with custon message in register hook
      const setUpdateError = (value, message) => {
         setSkillData({
            ...skillData,
            isError: value,
            message: message
         });
      }

      // form inputs to validate
      const validations = [
         ['title', skillData.title, 'Invalid title format'],
         ['description', skillData.description, 'Invalid description format']
      ]

      // apply evals and update position if everything is ok. Then, reset skills in redux
      for (let index in validations) {
         if (!evalField(validations[index][0], validations[index][1])) {
            setUpdateError(true, validations[index][2])
            return
         } else if (index == validations.length - 1) {
            setUpdateError(false, '')
            const userToken = userInfo?.token
            dispatch(updateSkill(skillData.id, skillData.title, skillData.description, userToken))
            dispatch(setSkill(""))
            dispatch(setSkillList([]))
            setTimeout(() => navigate("/skills"), 1000)
         }
      }
   }

   return (
      <div id="UpdateSkill">
         <div className="mainBox">
            <p>Update or delete skill</p>
            <form onSubmit={skillUpdate}>
               <div className="registerItem">
                  <label className="registerLabel">Title</label>
                  <input className="registerInput" onChange={handleInput} value={skillData.title} type="text" name="title" />
               </div>

               <div className="registerItem">
                  <label className="registerLabel">Description</label>
                  <input className="registerInput" onChange={handleInput} value={skillData.description} type="text" name="description" />
               </div>

               <div className="registerItem">
                  <button className="registerSubmit" type="submit">Update</button>
               </div>
            </form>
            <p className="errorMessage">{skillData.isError ? skillData.message : ''}</p>
            <p className="errorMessage">{skillInfo.isError ? skillInfo.errorMessage : skillInfo.successMessage}</p>
         </div>
      </div>
   )
}

export default UpdateSkill