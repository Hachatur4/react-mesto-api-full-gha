import React from 'react';

function InfoTooltip({isOpen, onClose, message}) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} 
      onClick={()=>{onClose()}}>
      <div className="popup__container-status" onClick={e=> e.stopPropagation()}>
        <img
            className="popup__status-image"
            src={message.icon}
            alt={message.altIcon}
          />
        <h3 className="popup__title-status">{message.text}</h3>
        <button type="button" className="popup__close-icon" onClick={()=>{onClose()}}></button>
      </div>
    </div>
  );
} 

export default InfoTooltip