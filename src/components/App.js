import React from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from "../utils/api";
import * as auth from "../utils/auth.js";

//need a state of isLoggedIn, setIsLoggedIn

function App() {
  let history = useHistory();

  //useState Hook - initial states and set states
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  // uses the auth file to create a new user

  function handleRegister(email, password) {
    auth.register(email, password)
      .then((data) => {
        console.log(data);
        if (data) {
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //functions to update user info, avatar, and add cards
  function handleUpdateUser(info) {
    api.editProfile(info)
      .then((info) => {
        setCurrentUser(info)
      })
      .then(() => {
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar)
      })
      .then(() => {
        setIsEditAvatarPopupOpen(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .then(() => {
        setIsAddPlacePopupOpen(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //get user info from server
  React.useEffect(() => {
    api.getUsersInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  //get cards from server
  React.useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(data);
    })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  function handleCardLike(card) {
    //check if card was already liked
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err)
      })
  }

  //delete card function 
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        const deleteCard = cards.filter((c) => c._id !== card._id);
        setCards(deleteCard)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //SET the modals open 
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  //set the card name and link 
  function handleCardClick({ name, link }) {
    setIsImagePopupOpen(true);
    setSelectedCard({ name, link });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Switch>
            {/* redirect users from root route, see previous lesson */}
            {/* <Route exact path="/">
              {

                loggedIn
                  ? <Redirect to="/" />
                  : <Redirect to="/signin" />
              }
            </Route> */}
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards} />
            {/* <Route exact path="/">
              <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              />
            </Route> */}
            <Route path="/signup">
              <Register
                onRegister={handleRegister}
              />
            </Route>
            <Route path="/signin">
              <Login />
            </Route>
          </Switch>
          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        >
        </EditProfilePopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        >
        </AddPlacePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        >
        </EditAvatarPopup>

        <PopupWithForm
          name={`deleteCard`}
          title={`Are you sure?`}
          buttonText={`Yes`}
        >
        </PopupWithForm>

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        >
        </ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;