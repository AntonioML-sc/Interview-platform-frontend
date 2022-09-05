
// import React from "react"
import { logout, userData } from "../../containers/User/userSlice"
import { useDispatch, useSelector } from "react-redux"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate } from "react-router-dom"
import "./Header.scss"

const Header = () => {
   const userInfo = useSelector(userData)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   // Log out and go to home page
   function getOut() {
      dispatch(logout())
      navigate("/")
   }

   return (
      <Navbar collapseOnSelect id="Header" className="text-white m-0 p-0" expand="md" variant="dark">
         <Container fluid className="black">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="py-0 px-0 my-0 mx-3" />
            <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="me-auto">
                  <Nav.Link as={Link} to="/" className="text-white mx-2">Home</Nav.Link>
                  <Nav.Link as={Link} to="/positions" className="text-white mx-2">Positions</Nav.Link>
               </Nav>
               {!userInfo?.data &&
                  <Nav>
                     <Nav.Link as={Link} to="/register" className="text-white mx-2" >Register</Nav.Link>
                     <Nav.Link as={Link} to="/login" className="text-white mx-2" >Log In</Nav.Link>
                  </Nav>
               }
               {userInfo?.data &&
                  <Nav>
                     <Nav.Link as={Link} to="/profile" className="text-white mx-2" >My Profile</Nav.Link>
                     <button id="logOutButton" onClick={getOut}>Log out</button>
                  </Nav>
               }
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}

export default Header