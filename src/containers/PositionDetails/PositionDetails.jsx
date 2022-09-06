
import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectPosition } from "../Positions/positionsSlice"
import { userData } from "../User/userSlice"
import "./PositionDetails.scss"

const PositionDetails = () => {
	const userInfo = useSelector(userData)
	const positionInfo = useSelector(selectPosition)
	const navigate = useNavigate()

	if (!positionInfo?.data) {
		navigate('/Positions')
	}

	return (
		<div id="PositionDetails">
			<div className="wellcomeMessageBox">
				<p>POSITION DETAILS</p>
			</div>
		</div>
	)
}

export default PositionDetails