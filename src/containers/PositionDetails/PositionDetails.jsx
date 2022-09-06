
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

	// number of applicants in this position currently (-1 because user admin is also in the list)
	const applicants = positionInfo?.users.length - 1

	// navigate to positions list view if there is no selected position in redux
	if (!positionInfo?.title) {
		navigate('/Positions')
	}

	return (
		<div id="PositionDetails">
			<div className="positionTextBox">
				<p className="cardTitle">{positionInfo.title}</p>
				<p className="cardCompany">{positionInfo.company.name.toUpperCase()}</p>
				<p className="cardText"><strong>Publication date: </strong>{new Date(positionInfo.created_at).toLocaleDateString()}</p>
				<p className="cardText"><strong>Number of applicants: </strong>{applicants}</p>
				<p className="cardText"><strong>Location: </strong>{positionInfo.location}</p>
				<p className="cardText"><strong>Mode: </strong>{positionInfo.mode}</p>
				<p className="cardText"><strong>Salary: </strong>{positionInfo.salary}</p>
				<p className="cardText"><strong>DESCRIPTION:</strong></p>
				<p className="cardText">{positionInfo.description}</p>
				<p className="cardText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, ipsum consectetur distinctio ullam harum nostrum ducimus quod quo omnis incidunt quas ut, sint, error quia maiores magni. Consequuntur eum assumenda molestiae nobis excepturi fugit, saepe aperiam dicta inventore doloremque facere accusantium, laudantium ipsam et autem dignissimos, velit odit? Asperiores, veniam? Provident nostrum sunt suscipit blanditiis, voluptas in ipsam adipisci laboriosam consequuntur, eum fugiat, dolores rem optio aperiam doloremque aliquam natus labore maxime perspiciatis? Assumenda in voluptatem a corrupti quas id. Nostrum, facilis dicta? Consequatur est magni dolorum quibusdam magnam. Explicabo pariatur facere omnis minus corporis neque maiores officiis cum ipsa.</p>
			</div>
		</div>
	)
}

export default PositionDetails