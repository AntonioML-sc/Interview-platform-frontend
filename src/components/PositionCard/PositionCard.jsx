import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPosition } from "../../containers/Position/positionsSlice";
import './PositionCard.scss'

const PositionCard = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goToPosition = () => {
        dispatch(setPosition(props.data))
        navigate('/position-details')
    }

    return (
        <div className="PositionCard">
            <div className="textCardsColumn">
                <p className="cardTitle">{props.data.title}</p>
                <p className="cardCompany">{props.data.company.name.toUpperCase()}</p>
                <p className="cardText">Published: {new Date(props?.data.created_at).toLocaleDateString()}</p>
                <p className="cardText">{props.data.location} | {props.data.mode}</p>
                <p className="cardText">Salary: {props.data.salary}</p>
            </div>
            <div className="itemColumn">
                <button className="detailsButton" onClick={goToPosition}>See details</button>
            </div>

        </div>
    )
}

export default PositionCard