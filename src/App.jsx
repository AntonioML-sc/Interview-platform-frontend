
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./containers/Home/Home"
import Login from './containers/User/Login/Login'
import Register from './containers/User/Register/Register'
import ApplicantProfile from './containers/User/ApplicantProfile/ApplicantProfile'
import RecruiterProfile from './containers/User/RecruiterProfile/RecruiterProfile'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Positions from './containers/Position/Positions/Positions'
import PositionDetails from './containers/Position/PositionDetails/PositionDetails'
import CreatePosition from './containers/Position/CreatePosition/CreatePosition'
import RegisterCompany from './containers/Company/RegisterCompany/RegisterCompany'
import RegisterSkill from './containers/Skill/RegisterSkill/RegisterSkill'
import Skills from './containers/Skill/Skills/Skills'
import UpdateSkill from './containers/Skill/UpdateSkill/UpdateSkill'
import CreateTest from './containers/SkillTest/CreateTest/CreateTest'
import GradeTest from './containers/SkillTest/GradeTest/GradeTest'
import UpdateProfile from './containers/User/UpdateProfile/UpdateProfile'

import './App.scss'

function App() {

   return (
      <div className="App">
         <BrowserRouter>
            <Header />
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/positions' element={<Positions />} />
               <Route path='/position-details' element={<PositionDetails />} />
               <Route path='/position-create' element={<CreatePosition />} />
               <Route path='/login' element={<Login />} />
               <Route path='/register' element={<Register />} />
               <Route path='/profile-applicant' element={<ApplicantProfile />} />
               <Route path='/profile-recruiter' element={<RecruiterProfile />} />
               <Route path='/profile-update' element={<UpdateProfile />} />
               <Route path='/company-register' element={<RegisterCompany />} />
               <Route path='/skill-register' element={<RegisterSkill />} />
               <Route path='/skills' element={<Skills />} />
               <Route path='/skill-update' element={<UpdateSkill />} />
               <Route path='/test-create' element={<CreateTest />} />
               <Route path='/test-grade' element={<GradeTest />} />
               <Route path='*' element={<Home />} />
            </Routes>
            <Footer />
         </BrowserRouter>
      </div>
   )
}

export default App
