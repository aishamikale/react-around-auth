import React from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";

function Card ({ card, onCardClick }) {
    const cardInfo = React.useContext(currentUserContext);
    //console.log(card);
    //const isOwn = card.owner._id === cardInfo._id;

    function handleClick() {
        onCardClick(card);
    } 
    
    return(
      <div className="card-template">
        <li className="card">
            <div className="card__image" style={{backgroundImage: `url(${card.link})`}} onClick={handleClick}/>
            <div className="card__info-container">
                <h2 className="card__title">{card.name}</h2>                    
                <button className="card__delete-button" type="button" aria-label="delete photo"></button>
                <div className="card__button-container">
                    <button className="card__like-button" type="button" aria-label="like photo"></button>
                    <p className="card__likes">{card.likes}</p>
                </div>
            </div>
        </li>
      </div>
    );
}

export default Card;