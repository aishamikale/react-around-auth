//import headerPath from '../images/headerlogo.svg';
import React from "react";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from "../utils/Api.js";
import { currentUserContext } from '../contexts/CurrentUserContext';

function App() {
    //useState Hook - initial state of popups
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState("");


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
    function handleCardClick({name, link}) {
        setIsImagePopupOpen(true);
        setSelectedCard({name, link});
    }

    //request user info from the server
    React.useEffect(() => {
      api.getUsersInfo()
        .then((res) => {
          setCurrentUser(res)
        })
        .catch((err) =>{
          console.log(err);
        })
    }, []);

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
          <div className="page__container">
              <Header/>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
              />
              <Footer/>
          </div>

        <PopupWithForm
            isOpen={isEditProfilePopupOpen}
            name={`profileForm`}
            title={`Edit Profile`}
            buttonText={`Save`}
            onClose={closeAllPopups}
        >
            <input 
              id="profile-name" 
              type="text" 
              className="form__input form__input_type_name" 
              name="username" 
              placeholder="Name" 
              minLength={4} 
              maxLength={40} 
              required
            />
            <span id="profile-name-error" className="modal__error"></span>

            <input 
              id="profile-title" 
              type="text" 
              className="form__input form__input_type_title" 
              name="title" 
              placeholder="Description" 
              minLength={2} 
              maxLength={200} 
              required
            />
            <span id="profile-title-error" className="modal__error"></span>
        </PopupWithForm>

        <PopupWithForm
            isOpen={isAddPlacePopupOpen}
            name={`cardForm`}
            title={`New place`}
            buttonText={`Create`}
            onClose={closeAllPopups}
        >
            <input 
              id="card-title" 
              type="text" 
              className="form__input form__input_type_card-title" 
              name="place" 
              placeholder="Title" 
              minLength={1} 
              maxLength={30} 
              required
            />
            <span id="card-title-error" className="modal__error"></span>

            <input 
              id="card-url" 
              type="url" 
              className="form__input form__input_type_url" 
              name="website" 
              placeholder="Image link" 
              required
            />
            <span id="card-url-error" className="modal__error"></span> 
        </PopupWithForm>

        <PopupWithForm
            isOpen={isEditAvatarPopupOpen}
            name={`cardForm`}
            title={`New place`}
            buttonText={`Create`}
            onClose={closeAllPopups}
        >
            <input 
              id="avatar-icon" 
              type="url" 
              className="form__input form__input_type_avatar" 
              name="avatar" 
              placeholder="url" 
              minLength={4} 
              required
            />
            <span id="avatar-icon-error" className="modal__error"></span>
        </PopupWithForm>

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
    </currentUserContext.Provider>
  );
}

export default App;