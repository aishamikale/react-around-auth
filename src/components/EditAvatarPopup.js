// import React from "react";
// import PopupWithForm from "./PopupWithForm.js";

// function EditAvatarPopup(props) {
//     const avatarRef = React.useRef('');

//     function handleSubmit(e) {
//         e.preventDefault();

//         props.onUpdateAvatar(avatarRef.current.value);

//     }

//     return(
//         <PopupWithForm
//         isOpen={props.isOpen}
//         onSubmit={handleSubmit}
//         name={`cardForm`}
//         title={`New place`}
//         buttonText={`Create`}
//         onClose={props.onClose}
//     >
//         <input
//           ref={avatarRef}
//           id="avatar-icon"
//           type="url"
//           className="form__input form__input_type_avatar" 
//           name="avatar" 
//           placeholder="url" 
//           minLength={4} 
//           required
//         />
//         <span id="avatar-icon-error" className="modal__error"></span>
//     </PopupWithForm>
//     );
// }

// export default EditAvatarPopup;