function Card (props) {
    function handleClick() {
        props.onCardClick(props.card);
    } 
    
    return(
      <div className="card-template">
        <li className="card">
            <div className="card__image" style={{backgroundImage: `url(${props.card.link})`}} onClick={handleClick}/>
            <div className="card__info-container">
                <h2 className="card__title">{props.card.name}</h2>                    
                <button className="card__delete-button" type="button" aria-label="delete photo"></button>
                <div className="card__button-container">
                    <button className="card__like-button" type="button" aria-label="like photo"></button>
                    <p className="card__likes">{props.card.likes}</p>
                </div>
            </div>
        </li>
      </div>
    );
}

export default Card;