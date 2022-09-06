import React from "react";
import './PositionCard.scss'

const PositionCard = (props) => {
    console.log(props.data)

    const goToPosition = () => {
        return
    }

    return (
        <div className="PositionCard">
            <p className="cardTitle">{props.data.title}</p>
            <p className="cardCompany">{props.data.company.name.toUpperCase()}</p>
            <p className="cardText">Published: {new Date(props?.data.created_at).toLocaleDateString()}</p>
            <p className="cardText">{props.data.location} | {props.data.mode}</p>
            <p className="cardText">Salary: {props.data.salary}</p>
            <button id="detailsButton" onClick={goToPosition}>See details</button>
        </div>
    )
}

export default PositionCard