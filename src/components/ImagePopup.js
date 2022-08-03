import React from 'react';

function ImagePopup({onClose, card}) {
  
  function handleCloseOverlay(evt) {
    return evt.target.classList.contains('popup_opened') && onClose();
  }

  return (
    <div className={`popup popup_type_photo ${card && 'popup_opened'}`} 
      onClick={handleCloseOverlay}>

      <div className="popup__container-photo">
        
        <button
          className="popup__close popup__close_type_image"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}>
          
        </button>
        
        <img 
          className="popup__photo-element" 
          src={!card ? '' : card.link} 
          alt={!card ? '' : card.name}
        />
        <h3 className="popup__title-photo">{!card ? '' : card.name}</h3>
      </div>
    </div>
  )
}

export default ImagePopup;
