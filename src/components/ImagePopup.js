function ImagePopup(props) {
    return(
        <div className={`modal modal_type_${props.name} ${props.isOpen ? 'modal_open' : ""}`}>
            <div className="modal__image-container">
                <button className="modal__button modal__image-button" type="button" aria-label="close popup" onClick={props.onClose}></button>
                <figure className="modal__figure">
                    <img src={props.card.link} alt="Place" className="modal__image"/>
                    <figcaption className="modal__image-title">{props.card.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;