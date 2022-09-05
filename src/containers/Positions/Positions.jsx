
import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import "./Positions.scss"
import { useSelector, useDispatch } from "react-redux"
import { selectPositionsList, setPositionsList } from "./positionsSlice"

const Positions = () => {
   const dispatch = useDispatch()
   const positionsList = useSelector(selectPositionsList)

   // data related to positions search
   let [searchData, setSearchData] = useState({
      searchWord: "",
      myTimeOut: 0
   })

   // updates positionsList (redux) and view depending on the search word
   useEffect(() => {
      const fetchPositions = async () => {
         try {
            if (searchData.searchWord == "") {
               await axios.get('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/positions/get-all')
                  .then(resp => {
                     dispatch(setPositionsList(resp.data.data))
                  }).catch((error) => {
                     dispatch(setPositionsList([]))
                  })
            } else {
               await axios.get(`https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/positions/get-by-keyword/${searchData.searchWord}`)
                  .then(resp => {
                     dispatch(setPositionsList(resp.data.data))
                  }).catch((error) => {
                     dispatch(setPositionsList([]))
                  })
            }
         } catch (error) {
            console.log(error)
         }
      }
      fetchPositions()
   }, [searchData.searchWord])

   const handleChange = (event) => {
      if (searchData.myTimeOut != 0) {
         clearInterval(searchData.myTimeOut)
      }
      setSearchData({
         ...searchData,
         myTimeOut: setTimeout(() => {
            setSearchData({
               ...searchData,
               searchWord: event.target.value,
               myTimeOut: 0
            })
         }, 500)
      })
   }

   return (
      <div id="Positions">
         <div className="mainBox">
            <div className="searchBar">
               <form className="searchBarForm">
                  <input className="inputBox" type="text" name="searchWord" onChange={handleChange} placeholder=" Search"></input>
               </form>
            </div>
            <p>POSITIONS PAGE</p>
         </div>
      </div>
   )
}

export default Positions