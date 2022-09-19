
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss"
import joinUsImg from "../../img/joinUsImg.png"
import shakeHandsImg from "../../img/shakeHands.jpg"
import carpenterImg from "../../img/carpenter.jpg"
import typingManImg from "../../img/typingMan.jpg"
import executiveImg from "../../img/executive.jpg"
import celebratingImg from "../../img/celebrating.jpg"

const Home = () => {
   const navigate = useNavigate()

   // navigation
   const goToRegister = () => {
      navigate('/register')
   }

   const goToLogIn = () => {
      navigate('/login')
   }

   const goToPositions = () => {
      navigate('/positions')
   }

   return (
      <div id="Home">
         <div className="mainBox">
            <div className="rowJoinUs">
               <div className="joinUsImage">
                  <img className="homeImg" src={joinUsImg} alt="Join us image" />
               </div>
               <div className="joinUsText">
                  <h1>Join the definitive professional comunity</h1>
                  <div className="buttonsContainer">
                     <button id="largeButton" onClick={goToRegister}>Register now</button>
                     <button id="largeButton" onClick={goToLogIn}>Log In</button>
                  </div>
               </div>
            </div>
            <div className="rowPositions">
               <div className="positionsImage">
                  <img className="homeImg" src={shakeHandsImg} alt="Jobs image" />
               </div>
               <div className="positionsText">
                  <h2>Search for your dream job</h2>
                  <p>Find the job that suits best your profile, preferences and lifestyle. Never had it been so easy!</p>
                  <button id="largeButton" onClick={goToPositions}>Search job offers</button>
               </div>
            </div>
            <div className="rowSkills">
               <div className="rowImages">
                  <div className="skillImage1">
                     <h2>Highlight your skills and strengths...</h2>
                     <img className="homeImg" src={carpenterImg} alt="Skills image" />
                  </div>
                  <div className="skillImage2">
                     <img className="homeImg" src={typingManImg} alt="Tests image" />
                     <h2>... or test your employees ones</h2>
                  </div>
               </div>
               <div className="skillsText">
                  <p>Choose among thousands of registered skills or create your own. There are no limits for talent.</p>
                  <p>Schedule and grade skill tests for the applicants that suits your needs and find the best match for your company!</p>
                  <button id="largeButton" onClick={goToPositions}>Search skills</button>
               </div>
            </div>
            <div className="rowComingSoon">
               <div className="comingSoonText">
                  <h2>Coming soon...</h2>
               </div>
               <div className="rowImages">
                  <div className="companiesImage">
                     <img className="homeImg" src={executiveImg} alt="Companies image" />
                     <h2>Companies search</h2>
                  </div>
                  <div className="usersImage">
                     <img className="homeImg" src={celebratingImg} alt="Users image" />
                     <h2>Advanced user search</h2>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Home;