import React from 'react';

function PopupWithForm(props) {

  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`} 
      onClick={()=>{props.onClose()}}>
      <div className="popup__container" onClick={e=> e.stopPropagation()}>
        <h3 className="popup__title">{props.title}</h3>
        <button type="button" className="popup__close-icon" onClick={()=>{props.onClose()}}></button>
        <form name={`form-${props.name}`} className={`form form-${props.name}`} noValidate onSubmit={props.onSubmit}>
          <fieldset className="form__set">
            {props.children}
            <button type="submit" className={`form__submit-button form-${props.name}-button`}>
              {props.buttonTitle}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
} 

export default PopupWithForm