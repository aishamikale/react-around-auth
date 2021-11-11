import React from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoToolTip from "./InfoTooltip.js";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from "../utils/api";
import * as auth from "../utils/auth.js";

//need a state of isLoggedIn, setIsLoggedIn

function App() {
  const history = useHistory();

  //useState Hook - initial states and set states
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);

  //get user info from server

  React.useEffect(() => {
    tokenCheck();
  })

  React.useEffect(() => {
    api.getUsersInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  React.useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(data);
    })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // update user info-avatar, add cards
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

  // modal functionality
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
    setIsInfoToolTipOpen(false);
  }

  //set the card name and link 
  function handleCardClick({ name, link }) {
    setIsImagePopupOpen(true);
    setSelectedCard({ name, link });
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          setIsSuccessful(false);
          setIsInfoToolTipOpen(true);
        } else {
          setIsSuccessful(true);
          setIsInfoToolTipOpen(true);
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth.getContent(token)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          setIsSuccessful(true);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      setLoggedIn(false);
      setIsSuccessful(false);
    }
  }

  // log in user
  function handleLogin(password, email) {
    auth.authorization(password, email)
      .then((res) => {
        if (!res) {
          setLoggedIn(false);
          setIsSuccessful(false);
          setIsInfoToolTipOpen(true);
          // history.push("/");
        } if (res.err) {
          setIsSuccessful(false);
          setIsInfoToolTipOpen(true);
        }
        setIsInfoToolTipOpen(true)
        tokenCheck();
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
        setIsInfoToolTipOpen(true);
      })
  }

  function onSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserEmail("");
    history.push("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              userEmail={userEmail}
              onSignOut={onSignOut} />
            <Route path="/signup">
              <Header link={"/signin"} text={"Sign In"} userEmail={userEmail}></Header>
              <Register
                onRegister={handleRegister}
              />
            </Route>
            <Route path="/signin">
              <Header link={"/signup"} text={"Sign Up"} userEmail={userEmail}></Header>
              <Login onLogin={handleLogin} />
            </Route>
            <Route exact path="/">
              {
                loggedIn
                  ? <Redirect to="/" />
                  : <Redirect to="/signin" />
              }
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
        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          isValid={isSuccessful}
        >
        </InfoToolTip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;