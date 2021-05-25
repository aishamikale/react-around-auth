import React from "react";
import api from '../utils/Api.js';
import Card from './Card.js';
import { currentUserContext } from '../contexts/CurrentUserContext';

function Main (props) {
    const userInfo = React.useContext(currentUserContext);

    // const [userName, setUserName] = React.useState("");
    // const [userDescription, setUserDescription] = React.useState("");
    // const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    //request user info from the server
    React.useEffect(() => {
        api.getInitialCards() 
        .then((res) => { 
            const cards = res.map((card) => ({ 
              _id: card._id, 
              name: card.name,
              link: card.link, 
              likes: card.likes.length 
            }));
            setCards(cards);
            //console.log(cards);
        }) 
     
          .catch((err) => { 
            console.log(err); 
          }); 
    },[]);
    
    return(
        <main className="content">
                <section className="profile">
                    <div className="profile__avatar-overlay" onClick={props.onEditAvatar}></div>
                    <img src={userInfo.avatar} alt="User avatar" className="profile__avatar" />
                    <div className="profile__info">
                            <h1 className="profile__title">{userInfo.name}</h1>
                            <button className="profile__edit-button" type="button" aria-label="edit" onClick={props.onEditProfile}></button>
                            <p className="profile__subtitle">{userInfo.about}</p>
                    </div>
                    <button className="profile__add-button" type="button" aria-label="add" onClick={props.onAddPlace}></button>
                </section>
                <section className="cards">
                    <ul className="cards__grid">
                        {cards.map((card, id) => {
                            return (<Card key={id} card={card} onCardClick={props.onCardClick}/>);
                        })}
                    </ul>
                </section>
            </main>
    );
}

export default Main;