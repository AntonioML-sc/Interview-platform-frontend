
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./containers/Home/Home"
import './App.scss'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
