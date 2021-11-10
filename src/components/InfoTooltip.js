import unionPath from '../images/Union.svg';
import errorPath from '../images/error.svg';

function InfoToolTip(props, { onClose }) {
    return (
        <div className={`modal modal_type_${props.name} && ${props.isOpen ? "modal_open" : ""}`}>
            <div className="modal__container">
                <img className="modal__icon" src={props.isValid ? unionPath : errorPath} alt={props.isValid ? 'Success' : 'Error'} />
                {props.isValid ? <p className="modal__infotool-text">Success! You have now been registered.</p> : <p className="modal__infotool-text">Oops, something went wrong! Please try again</p>}
                <button className="modal__button" type="button" aria-label="close popup" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoToolTip;