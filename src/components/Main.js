import React from "react"; 
//import api from '../utils/Api.js'; 
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
 
function Main ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, cards, onCardDelete }) { 
    // const [cards, setCards] = React.useState([]);

    //subscribe to the user context
    const currentUser = React.useContext(CurrentUserContext);

    //get initial cards from the server
    // React.useEffect(() => {
    //     api.getInitialCards().then((data) =>{
    //         setCards(data);
    //      })
    //      .catch((err) => {
    //          console.log(err)
    //      })
    // },[])

    // function handleCardLike(card) {
    //     //check if card was already liked
    //     const isLiked = card.likes.some(i => i._id === currentUser._id);

    //     api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
    //         setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    //     });
    // }
     
    return( 
        <main className="content">
                <section className="profile"> 
                    <div className="profile__avatar-overlay" onClick={onEditAvatar}></div> 
                    <img src={currentUser.avatar} alt="User avatar" className="profile__avatar" /> 
                    <div className="profile__info"> 
                            <h1 className="profile__title">{currentUser.name}</h1> 
                            <button className="profile__edit-button" type="button" aria-label="edit" onClick={onEditProfile}></button> 
                            <p className="profile__subtitle">{currentUser.about}</p> 
                    </div> 
                    <button className="profile__add-button" type="button" aria-label="add" onClick={onAddPlace}></button> 
                </section> 
                <section className="cards"> 
                    <ul className="cards__grid">
                        {cards.map((card) => (
                            <Card key={card._id} 
                            card={card} 
                            link={card.link}
                            name={card.name}
                            likes={card.likes}
                            onCardClick={onCardClick} 
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete} />
                        ))}
                    </ul> 
                </section> 
            </main> 
    ); 
} 
 
export default Main;