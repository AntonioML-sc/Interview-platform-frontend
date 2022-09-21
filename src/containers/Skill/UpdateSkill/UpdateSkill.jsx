
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { evalField } from "../../../utils";
import { userData } from "../../User/userSlice";
import { clear, deleteSkill, selectSkillState, updateSkill } from "../skillSlice";
import './UpdateSkill.scss'

const UpdateSkill = () => {
   const userInfo = useSelector(userData)
   const skillInfo = useSelector(selectSkillState)
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
            (userInfo.data.id == skillInfo.skill.pivot.user_id) && (skillInfo.skill.pivot.creator)
         )
      }
      if (!userInfo?.data || skillInfo.skill == "" || !checkUser()) {
         navigate('/')
      } else {
         setSkillData({
            ...skillData,
            id: skillInfo.skill.id,
            title: skillInfo.skill.title,
            description: skillInfo.skill.description
         })
      }
   }, [])

   // function to set an error with custon message in register hook
   const setError = (value, message) => {
      setSkillData({
         ...skillData,
         isError: value,
         message: message
      });
   }

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

      // form inputs to validate
      const validations = [
         ['title', skillData.title, 'Invalid title format'],
         ['description', skillData.description, 'Invalid description format']
      ]

      // apply evals and update position if everything is ok. Then, reset skills in redux and refresh
      // user data from db (because user skills will have changed)
      for (let index in validations) {
         if (!evalField(validations[index][0], validations[index][1])) {
            setError(true, validations[index][2])
            return
         } else if (index == validations.length - 1) {
            setError(false, '')
            const userToken = userInfo?.token
            dispatch(updateSkill(skillData.id, skillData.title, skillData.description, userToken))
            setTimeout(() => {
               dispatch(clear())
               navigate("/")
            }, 1000)
         }
      }
   }

   // test if the info stored is correct and delete skill in that case. Then, reset skills in redux and refresh
   // user data from db (because user skills will have changed)
   const skillDelete = (event) => {
      const userToken = userInfo?.token
      setError(false, '')
      dispatch(deleteSkill(skillData.id, userToken))
      setTimeout(() => {
         dispatch(clear())
         navigate("/")
      }, 1000)
   }

   return (
      <div id="UpdateSkill">
         <div className="mainBox">
            <p className="formTitle">Update or delete skill</p>
            <form className="registerForm" onSubmit={skillUpdate}>
               <div className="registerItem">
                  <label className="registerLabel">Title</label>
                  <input className="registerInput" onChange={handleInput} value={skillData.title} type="text" name="title" />
               </div>
               <div className="registerItem inColumn">
                  <label className="registerLabel">Description</label>
                  <textarea className="registerInput description" onChange={handleInput} value={skillData.description} type="text" name="description" />
               </div>

               <div className="registerItem">
                  <button className="detailsButton" type="submit">Update skill</button>
                  <button className="detailsButton" type="button" onClick={skillDelete} >Delete skill</button>
               </div>
            </form>
            <p className="errorMessage">{skillData.isError ? skillData.message : ''}</p>
            <p className="errorMessage">{skillInfo.isError ? skillInfo.errorMessage : skillInfo.successMessage}</p>
         </div>
      </div>
   )
}

export default UpdateSkill