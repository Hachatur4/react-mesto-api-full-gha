import React from 'react';
import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup({isOpen, onAddPlace, onClose}) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');  

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onAddPlace({
      name,
      link,
    });
  } 

  return (
    <PopupWithForm 
    name='card' 
    title='Новое место' 
    buttonTitle='Создать' 
    isOpen={isOpen} 
    onClose={onClose}
    onSubmit={handleSubmit}>
        <label className="form__field">
          <input
            type="text"
            name="name"
            id="name-input"
            className="form__input form-card__input"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            value={name}
            onChange={handleChangeName}
          />
          <span className="form__input-error name-input-error"></span>
        </label>
        <label className="form__field">
          <input
            type="url"
            name="link"
            id="link-input"
            className="form__input form-card__input"
            placeholder="Ссылка на картинку"
            required
            value={link}
            onChange={handleChangeLink}
          />
          <span className="form__input-error link-input-error"></span>
        </label>
    </PopupWithForm>
  );
} 

export default AddPlacePopup