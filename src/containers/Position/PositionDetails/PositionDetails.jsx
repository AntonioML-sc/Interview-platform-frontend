
import axios from "axios"
import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectPosition, setPosition } from "../positionsSlice"
import { refreshUserData, userData } from "../../User/userSlice"
import { setUserId } from "../../SkillTest/skillTestSlice"
import "./PositionDetails.scss"

const PositionDetails = () => {
   const userInfo = useSelector(userData)
   const positionInfo = useSelector(selectPosition)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const recruiterId = "5695fbbd-4675-4b2a-b31d-603252c21c94"
   let [data, setData] = useState({
      lastAction: ""
   })

   // navigate to positions list view if there is no selected position in redux
   useEffect(() => {
      if (!positionInfo?.title) {
         navigate('/Positions')
      }
   }, [])

   // function to check if ther is a logged user and if he/she is already a position admin, an applicant or none of them
   function userRole(positionUsers, user) {
      if (!user?.data) {
         return "no user"
      } else {
         for (let index in positionUsers) {
            if (positionUsers[index].id == user.data.id) {
               if (positionUsers[index].role_id == recruiterId) {
                  return "admin"
               } else {
                  return "applicant"
               }
            } else if (index == positionUsers?.length - 1) {
               return "none"
            }
         }
      }
   }

   let userInPosition = userRole(positionInfo.users, userInfo)

   // update position in slice after an action that could have changed it
   useEffect(() => {
      const fetchPosition = async () => {
         await axios.get(`https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/positions/get-by-id/${positionInfo?.id}`)
            .then(resp => {
               dispatch(setPosition(resp.data.data))
            }).then(resp => {
               userInPosition = userRole(positionInfo.users, userInfo)
            }).catch(error => {
               console.log(error)
            })
      }
      fetchPosition()
   }, [data.lastAction])

   // number of applicants in this position currently (-1 because user admin is also in the list)
   const applicants = positionInfo?.users.length - 1

   // handler to apply for a position
   const applyForPosition = async (event) => {
      const config = {
         headers: { "Authorization": `Bearer ${userInfo.token}` }
      }
      const body = {
         "position_id": positionInfo.id
      }
      await axios.post('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/applications/apply', body, config)
         .then(resp => {
            setData({
               ...data,
               lastAction: "applied"
            })
         }).then(resp => {
            dispatch(refreshUserData())
         }).catch(error => {
            console.log(error)
         })
   }

   // handler to go to create test
   const goToCreateTest = (userId) => {
      dispatch(setUserId(userId))
      setTimeout(() => {
         navigate('/test-create')
      }, 500)
   }

   // ------------ RENDER FUNCTIONS ------------ \\

   // renders a button to apply for the position or a message if logged user is the admin or already applied
   const ActionsLine = () => {
      switch (userInPosition) {
         case "admin":

            return (<p className="msgText">- You are the admin of this position -</p>)
         case "applicant":

            return (<p className="msgText">- You have already applied for this position -</p>)
         case "none":

            return (<div className="tagsContainer"><button className="button" onClick={applyForPosition}>Apply</button></div>)
         case "no user":

            return (<p className="msgText">- Log in or register to apply for this position -</p>)
         default:

            return (<div></div>)
      }
   }

   // renders the list of required skills
   const SkillList = () => {
      if (positionInfo.skills.length > 0) {
         return (
            positionInfo.skills.map((skill, index) => (
               <p key={index} className="skillTag">{skill.title}</p>
            ))
         )
      }
   }

   // renders the list of applicants
   const ApplicantsList = () => {
      const applicants = positionInfo.users.filter(user => { return user.role_id != recruiterId })
      return (
         applicants.map((user, index) => (
            <div key={index} className="cardBox">
               <p className="cardTitle">{user.first_name} {user.last_name}</p>
               <p className="cardText"><strong>{user.title.toUpperCase()}</strong></p>
               <p className="cardText"><strong>Contact: </strong>{user.email} | {user.phone}</p>
               <div className="tagsContainer">
                  <button className="button" onClick={e => goToCreateTest(user.id)}>Schedule test</button>
               </div>
            </div>
         ))
      )
   }

   return (
      <div id="PositionDetails">
         <div className="detailsBox positionDetailsBoxColor">
            <div className="cardBox">
               <p className="cardHeading">POSITION DETAILS</p>
            </div>
            <div className="cardBox">
               <p className="cardTitle">{positionInfo.title}</p>
               <p className="cardCompany">{positionInfo.company.name.toUpperCase()}</p>
               <p className="cardText"><strong>Publication date: </strong>{new Date(positionInfo.created_at).toLocaleDateString()}</p>
               <ActionsLine />
               <p className="cardText"><strong>Number of applicants: </strong>{applicants}</p>
               <p className="cardText"><strong>Location: </strong>{positionInfo.location}</p>
               <p className="cardText"><strong>Mode: </strong>{positionInfo.mode}</p>
               <p className="cardText"><strong>Salary: </strong>{positionInfo.salary}</p>
               <p className="cardText"><strong>REQUIRED SKILLS:</strong></p>
               <div className="tagsContainer">
                  <SkillList />
               </div>
               <p className="cardText"><strong>DESCRIPTION:</strong></p>
               <p className="cardText">{positionInfo.description}</p>
               <p className="cardText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, ipsum consectetur distinctio ullam harum nostrum ducimus quod quo omnis incidunt quas ut, sint, error quia maiores magni. Consequuntur eum assumenda molestiae nobis excepturi fugit, saepe aperiam dicta inventore doloremque facere accusantium, laudantium ipsam et autem dignissimos, velit odit? Asperiores, veniam? Provident nostrum sunt suscipit blanditiis, voluptas in ipsam adipisci laboriosam consequuntur, eum fugiat, dolores rem optio aperiam doloremque aliquam natus labore maxime perspiciatis? Assumenda in voluptatem a corrupti quas id. Nostrum, facilis dicta? Consequatur est magni dolorum quibusdam magnam. Explicabo pariatur facere omnis minus corporis neque maiores officiis cum ipsa.</p>
            </div>
         </div>
         {userInPosition == "admin" &&
            <div className="detailsBox applicantsBoxColor">
               <div className="cardBox">
                  <p className="cardHeading">APPLICANTS</p>
               </div>
               <ApplicantsList />
            </div>
         }
      </div>
   )
}

export default PositionDetails