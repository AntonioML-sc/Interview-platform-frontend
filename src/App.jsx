
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./containers/Home/Home"
import Positions from './containers/Positions/Positions'
import Login from './containers/User/Login/Login'
import Register from './containers/User/Register/Register'
import Profile from './containers/User/Profile/Profile'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import './App.scss'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/positions' element={<Positions/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
