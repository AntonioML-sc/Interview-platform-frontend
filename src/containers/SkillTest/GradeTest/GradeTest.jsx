
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userData } from "../../User/userSlice"
import { selectTest } from "../skillTestSlice"
import "./GradeTest.scss"

const GradeTest = () => {
   const userInfo = useSelector(userData)
   const testInfo = useSelector(selectTest)
   const navigate = useNavigate()

   useEffect(() => {
      if (!userInfo?.data || !testInfo?.id) {
         navigate('/')
      }
   }, [])

   return (
      <div id="GradeTest">
         <div className="wellcomeMessageBox">
            <p>GRADE TEST PAGE</p>
         </div>
      </div>
   )
}

export default GradeTest;