import React from "react";
import './SkillCard.scss'

const SkillCard = (props) => {
    return (
        <div className="SkillCard">
            <p className="cardTitle">{props.data.title}</p>
            <p className="cardText">{props.data.description}</p>
        </div>
    )
}

export default SkillCard