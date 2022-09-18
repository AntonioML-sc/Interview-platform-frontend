
import React from "react"
import "./Footer.scss"

const Footer = () => {

   return (
      <div id="Footer">
         <div className="box left">
            <a href="">About</a>
            <a href="">Accessibility</a>
            <a href="">User Agreement</a>
            <a href="">Copyright</a>
         </div>
         <div className="box center">
            <div className="logoContainer">
               <img className="logo" src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="" />
               <a href="https://geekshubsacademy.com/"><img className="logo" src="https://avatars.githubusercontent.com/u/36510045?s=280&v=4" alt="" /></a>
               <img className="logo" src="https://cdn.icon-icons.com/icons2/2429/PNG/512/facebook_logo_icon_147291.png" alt="" />
               <img className="logo" src="https://cdn.icon-icons.com/icons2/1101/PNG/512/1485969399-twitersocialnetworkbrandlogo_78853.png" alt="" />
            </div>
         </div>
         <div className="box right">
            <a href="">Privacy Policy</a>
            <a href="">Cookie Policy</a>
            <a href="">Careers</a>
            <a href="">Community</a>
         </div>
      </div>
   )
}

export default Footer