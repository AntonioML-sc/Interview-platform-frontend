
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./containers/Home/Home"
import Login from './containers/User/Login/Login'
import Register from './containers/User/Register/Register'
import Profile from './containers/User/Profile/Profile'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Positions from './containers/Position/Positions/Positions'
import PositionDetails from './containers/Position/PositionDetails/PositionDetails'
import CreatePosition from './containers/Position/CreatePosition/CreatePosition'
import RegisterCompany from './containers/Company/RegisterCompany/RegisterCompany'

import './App.scss'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/positions' element={<Positions/>}/>
          <Route path='/position-details' element={<PositionDetails/>}/>
          <Route path='/position-create' element={<CreatePosition/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/company-register' element={<RegisterCompany/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
