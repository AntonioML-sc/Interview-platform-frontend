
import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setPosition } from "../../Position/positionsSlice"
import { setSkill } from "../../Skill/skillSlice"
import { setTest } from "../../SkillTest/skillTestSlice"
import { userData } from "../userSlice"
import "./RecruiterProfile.scss"

const RecruiterProfile = () => {
   const recruiterRoleId = "5695fbbd-4675-4b2a-b31d-603252c21c94"
   const userInfo = useSelector(userData)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   useEffect(() => {
      if (!userInfo?.data) {
         navigate('/')
      } else if (userInfo.data.role_id != recruiterRoleId) {
         navigate('/profile-applicant')
      }
   }, [])

   // ------------ HANDLERS ------------ \\

   // go to position details on click
   const goToPosition = async (positionId) => {
      await axios.get(`https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/positions/get-by-id/${positionId}`)
         .then(resp => {
            dispatch(setPosition(resp.data.data))
         }).then(resp => {
            navigate('/position-details')
         }).catch(error => {
            console.log(error)
         })
   }

   // save in redux the skill to update or delete and go to update skill page on click
   const goToUpdateSkill = (skill) => {
      dispatch(setSkill(skill))
      setTimeout(() => {
         navigate('/skill-update')
      }, 500)
   }

   // save in redux the skill to update or delete and go to update skill page on click
   const goToGradeTest = (test) => {
      dispatch(setTest(test))
      setTimeout(() => {
         navigate('/test-grade')
      }, 500)
   }

   const goToUpdateProfile = () => {
      navigate('/profile-update')
   }

   // ------------ RENDER FUNCTIONS ------------ \\

   // render a skill tag for each skill that logged user have
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

   // render a skill card for each logged user created skill
   const SkillAdminList = () => {
      if (userInfo?.data.skills.length > 0) {
         const adminSkillList = userInfo.data.skills.filter(value => { return value.pivot.creator })
         return (
            adminSkillList.map((skill, index) => (
               <div className="userInfoItem column" key={index}>
                  <p className="userInfoHeading">Title: {skill.title} </p>
                  <p className="userInfoText"><strong>Description:</strong> {skill.description} </p>
                  <button id="detailsButton" onClick={e => goToUpdateSkill(skill)} >Edit or delete</button>
               </div>
            ))
         )
      } else {

         return (
            <div></div>
         )
      }
   }

   // render a company card for each company registered by logged user
   const CompanyAdminList = () => {
      if (userInfo?.data.companies.length > 0) {
         return (
            userInfo.data.companies.map((company, index) => (
               <div className="userInfoItem column" key={index}>
                  <p className="userInfoHeading">Name: {company.name} </p>
                  <p className="userInfoText">Email: {company.email} </p>
                  <p className="userInfoText">Address: {company.address} </p>
                  <p className="userInfoText">Description: {company.description} </p>
                  <button id="detailsButton">Edit or delete</button>
               </div>
            ))
         )
      } else {

         return (
            <div></div>
         )
      }
   }

   // render a position card for each position
   const PositionList = () => {
      if (userInfo?.data.positions.length > 0) {
         return (
            userInfo.data.positions.map((position, index) => (
               <div className="userInfoItem column" key={index}>
                  <p className="userInfoHeading"> {position.title} </p>
                  <p className="userInfoText"> Company: {position.company.name} </p>
                  <p className="userInfoText"> Status: {position.application.status} </p>
                  <div className="skillContainer">
                     <button id="detailsButton" onClick={e => goToPosition(position.id)}>See details</button>
                     <button id="detailsButton">Edit or close</button>
                  </div>
               </div>
            ))
         )
      } else {

         return (
            <div></div>
         )
      }
   }

   // render a test card for each test
   const TestList = () => {
      if (userInfo?.data.tests.length > 0) {

         return (
            userInfo.data.tests.map((test, index) => (
               <div className="userInfoItem column" key={index}>
                  {test.users[0].id != userInfo.data.id &&
                     <p className="userInfoHeading">Examinee: {test.users[0].first_name} {test.users[0].last_name} | {test.users[0].email}</p>
                  }
                  {test.users[1].id != userInfo.data.id &&
                     <p className="userInfoHeading">Examinee: {test.users[0].first_name} {test.users[0].last_name} | {test.users[0].email}</p>
                  }
                  <p className="userInfoText">Date: {new Date(test.date).toLocaleDateString()}</p>
                  <p className="userInfoText">Time: {new Date(test.date).toLocaleTimeString()}</p>
                  <div className="skillContainer">
                     <SkillTestList data={test.skills} />
                  </div>
                  <button id="detailsButton" onClick={event => goToGradeTest(test)}>Grade test</button>
               </div>
            ))
         )

      } else {

         return (
            <div></div>
         )
      }
   }

   // render a skill tag for each test skill
   const SkillTestList = (skills) => {
      if (skills.data.length > 0) {

         return (
            skills.data.map((skill, index) => (
               <p key={index} className="skillTag">{skill.title}: <strong>{skill.marks.mark}/10</strong></p>
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
               <p className="userInfoSection">MY PROFILE</p>
            </div>
            <div className="userInfoItem row">
               <p className="userInfoName">{userInfo.data.first_name} {userInfo.data.last_name}</p>
               <button id="detailsButton" onClick={goToUpdateProfile}>Update profile</button>
            </div>
            <div className="userInfoItem column">
               <p className="userInfoRole">Profile type: Recruiter</p>
               <p className="userInfoText">Date of creation: {new Date(userInfo.data.created_at).toLocaleDateString()}</p>
            </div>
            <div className="userInfoItem column">
               <p className="userInfoHeading">CONTACT INFORMATION:</p>
               <p className="userInfoText">Email: {userInfo.data.email}</p>
               <p className="userInfoText">Phone: {userInfo.data.phone}</p>
            </div>
            <div className="userInfoItem column">
               <p className="userInfoHeading">PROFESSIONAL INFORMATION:</p>
               <p className="userInfoText">Title: {userInfo.data.title}</p>
               <p className="userInfoText">Skills:</p>
               <div className="skillContainer">
                  <SkillList />
               </div>
               <p className="userInfoText">Description:</p>
               <p className="userInfoText">{userInfo.data.description}</p>
            </div>
         </div>
      )
   }

   // render skills that logged user is the creator
   const UserAdminSkills = () => {
      return (
         <div className="userInfo">
            <div className="userInfoItem">
               <p className="userInfoSection">CREATED SKILLS</p>
            </div>
            <SkillAdminList />
         </div>
      )
   }

   // render companies that logged user is the creator
   const UserAdminCompanies = () => {
      return (
         <div className="userInfo">
            <div className="userInfoItem">
               <p className="userInfoSection">MY COMPANIES</p>
            </div>
            <CompanyAdminList />
         </div>
      )
   }

   // render positions that user is applying for
   const UserPositions = () => {
      return (
         <div className="userInfo">
            <div className="userInfoItem">
               <p className="userInfoSection">MY POSITIONS</p>
            </div>
            <PositionList />
         </div>
      )
   }

   // render tests that user is implied in
   const UserTests = () => {
      return (
         <div className="userInfo">
            <div className="userInfoItem">
               <p className="userInfoSection">MY TESTS</p>
            </div>
            <TestList />
         </div>
      )
   }

   if (userInfo?.data) {
      return (
         <div id="RecruiterProfile">
            <div className="mainBox">
               <UserInfo />
               <UserAdminCompanies />
               <UserAdminSkills />
               <UserPositions />
               <UserTests />
            </div>
         </div>
      )
   }
}

export default RecruiterProfile