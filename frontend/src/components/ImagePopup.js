import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <div className= {`popup popup-image ${Object.entries(card).length >= 1 ? 'popup_opened' : ''}`} onClick={()=>{onClose()}}>
      <div className="popup__container-image" onClick={e=> e.stopPropagation()}>
        <img
          className="popup__element-image"
          src={card.link}
          alt={card.name}
        />
        <p className="popup__title-image">{card.name}</p>
        <button type="button" className="popup__close-icon" onClick={()=>{onClose()}}></button>
      </div>
    </div>
  );
} 

export default ImagePopup