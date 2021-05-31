import React from "react"; 
import api from '../utils/Api.js'; 
import Card from './Card.js'; 
 
function Main ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) { 
    const [userName, setUserName] = React.useState(""); 
    const [userDescription, setUserDescription] = React.useState(""); 
    const [userAvatar, setUserAvatar] = React.useState(""); 
    const [cards, setCards] = React.useState([]); 
 
    //request user info from the servers
    React.useEffect(() =>{
        api.getUsersInfo().then((res) =>{
            setUserName(res.name); 
            setUserDescription(res.about); 
            setUserAvatar(res.avatar); 
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    //get initial cards from the server
    React.useEffect(() => {
        api.getInitialCards().then((data) =>{
            setCards(data);
            // const cards = res.map((card) => ({ 
            //     id: card._id, 
            //     name: card.name, 
            //     link: card.link, 
            //     likes: card.likes.length, 
            //   })); 
            //   //console.log(res); 
            //   setCards(cards); 
         })
         .catch((err) => {
             console.log(err)
         })
    },[])
     
    return( 
        <main className="content"> 
                <section className="profile"> 
                    <div className="profile__avatar-overlay" onClick={onEditAvatar}></div> 
                    <img src={userAvatar} alt="User avatar" className="profile__avatar" /> 
                    <div className="profile__info"> 
                            <h1 className="profile__title">{userName}</h1> 
                            <button className="profile__edit-button" type="button" aria-label="edit" onClick={onEditProfile}></button> 
                            <p className="profile__subtitle">{userDescription}</p> 
                    </div> 
                    <button className="profile__add-button" type="button" aria-label="add" onClick={onAddPlace}></button> 
                </section> 
                <section className="cards"> 
                    <ul className="cards__grid">
                        {cards.map((card) => (
                            <Card key={card._id} card={card} link={card.link} name={card.name} likes={card.likes} onCardClick={onCardClick} />
                        ))}
                        {/* {cards.map((card, id) => { 
                            return (<Card key={id} card={card} onCardClick={onCardClick}/>); 
                        })}  */}
                    </ul> 
                </section> 
            </main> 
    ); 
} 
 
export default Main;