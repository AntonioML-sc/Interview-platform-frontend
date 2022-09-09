
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import SkillCard from "../../../components/SkillCard/SkillCard"
import { logError, selectSkillList, setSkillList } from "../skillSlice"
import "./Skills.scss"

const Skills = () => {
   const dispatch = useDispatch()
   const skillList = useSelector(selectSkillList)

   let [skillsData, setSkillsData] = useState({
      skillSearchList: [],
      searchWord: "",
      myTimeOut: 0
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
         } else {
            const search = (value) => {

               return (
                  value.title.toLowerCase().startsWith(skillsData.searchWord.toLowerCase()) ||
                  value.description.toLowerCase().includes(skillsData.searchWord.toLowerCase())
               )
            }
            const searchList = skillList.filter(search)
            setSkillsData({
               ...skillsData,
               skillSearchList: searchList
            })
         }
      }
      fetchSkills()
   }, [skillsData.searchWord])

   const handleChange = (event) => {
      if (skillsData.myTimeOut != 0) {
         clearInterval(skillsData.myTimeOut)
      }
      setSkillsData({
         ...skillsData,
         myTimeOut: setTimeout(() => {
            setSkillsData({
               ...skillsData,
               searchWord: event.target.value,
               myTimeOut: 0
            })
         }, 300)
      })
   }

   // render a skill card for each skill stored in skillSearchList
   const SkillsList = () => {
      if (skillsData.skillSearchList.length > 0) {
         return (
            skillsData.skillSearchList.map((skill, index) => (
               <div key={index}>
                  <SkillCard data={skill} />
               </div>
            ))
         )
      } else {

         return (
            <div></div>
         )
      }
   }

   return (
      <div id="Skills">
         <div className="mainBox">
            <div className="searchBar">
               <form className="searchBarForm">
                  <input className="inputBox" type="text" name="searchWord" onChange={handleChange} placeholder=" Search"></input>
               </form>
            </div>
            <div className="skillsList">
               <SkillsList />
            </div>
         </div>
      </div>
   )
}

export default Skills;