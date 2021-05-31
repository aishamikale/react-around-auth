// import React from "react";
// import PopupWithForm from "./PopupWithForm.js";
// import { currentUserContext } from '../contexts/CurrentUserContext';

// function EditProfilePopup(props) {
//     const [name, setName] = React.useState('');
//     const [description, setDescription] = React.useState('');

//     //subscribe to the context
//     const presentUser = React.useContext(currentUserContext);

//     function handleNameChange(e) {
//         setName(e.target.value);
//     }

//     function handleDescription(e) {
//         setDescription(e.target.value);
//     }

//     function handleSubmit(e) {
//         e.preventDefault();

//         //pass values of managed components to external handler
//         props.onUpdateUser({
//             name,
//             about: description,
//         });
//     }

//     React.useEffect(() =>{
//         setName(presentUser.name);
//         setDescription(presentUser.about);
//     }, [presentUser])

//     return(
//         <PopupWithForm
//         isOpen={props.isOpen}
//         onSubmit={handleSubmit}
//         name={`profileForm`}
//         title={`Edit Profile`}
//         buttonText={`Save`}
//         onClose={props.onClose}
//     >
//         <input 
//           id="profile-name" 
//           type="text" 
//           className="form__input form__input_type_name" 
//           name="username"
//           placeholder="Name" 
//           minLength={4}
//           maxLength={40}
//           onChange={handleNameChange}
//           required
//         />
//         <span id="profile-name-error" className="modal__error"></span>

//         <input 
//           id="profile-title" 
//           type="text" 
//           className="form__input form__input_type_title" 
//           name="title" 
//           placeholder="Description" 
//           minLength={2} 
//           maxLength={200}
//           onChange={handleDescription}
//           required
//         />
//         <span id="profile-title-error" className="modal__error"></span>
//     </PopupWithForm> 
//     );
// }

// export default EditProfilePopup;