import React from "react";
import './PositionCard.scss'

const PositionCard = (props) => {
    console.log("llego")

    return(
        <div className="PositionCard">
            <p className="cardText">{props.data.title}</p>
        </div>
    )
}

export default PositionCard