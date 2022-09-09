
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logError, selectSkillList, setSkillList } from "../skillSlice"
import "./Skills.scss"

const Skills = () => {
   const dispatch = useDispatch()
   const skillList = useSelector(selectSkillList)

   let [skillsData, setSkillsData] = useState({
      skillSearchList: [],
      searchword: ""
   })

   useEffect(() => {
      const fetchSkills = async () => {
         if (skillList.length == 0) {
            await axios.get('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/skills/get-all')
               .then(resp => {
                  dispatch(setSkillList(resp.data.data))
                  setSkillsData({
                     ...skillsData,
                     skillSearchList: resp.data.data
                  })
               }).catch(error => {
                  dispatch(logError(error))
               })
         }
      }
      fetchSkills()
   }, [])

   console.log(skillsData.skillSearchList)

   return (
      <div id="Skills">
         <div className="wellcomeMessageBox">
            <p>SKILLS PAGE</p>
         </div>
      </div>
   )
}

export default Skills;