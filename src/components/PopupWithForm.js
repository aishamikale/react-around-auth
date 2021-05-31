function PopupWithForm({ name, title, isOpen, children, buttonText, onClose}) { 
    return ( 
        //popup with form structure 
        <div className={`modal modal_type_${name} && ${isOpen ? 'modal_open' : ""}`}> 
            <div className="modal__container"> 
            <form action="#" className={`form form_type_${name}`} name={name}> 
                    <h2 className="form__heading">{`${title}`}</h2> 
                    {children} 
                    <button className="form__button" type="submit">{buttonText}</button> 
                </form> 
                <button className="modal__button" type="button" aria-label="close popup" onClick={onClose}></button> 
            </div> 
        </div> 
    ); 
  } 
 
  export default PopupWithForm; 