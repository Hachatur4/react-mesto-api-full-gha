import React from 'react';
import PopupWithForm from './PopupWithForm.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function EditProfilePopup({onUpdateUser, isOpen, onClose}) {

  const currentUser = React.useContext(CurrentUserContext);
  
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');  

  React.useEffect(() => {
    if(isOpen){
      setName(currentUser.user.name);
      setDescription(currentUser.user.about);
    }
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm 
    name='profile' 
    title='Редактировать профиль' 
    buttonTitle='Сохранить' 
    isOpen={isOpen} 
    onClose={onClose}
    onSubmit={handleSubmit}>
        <label className="form__field">
          <input
            type="text"
            name="Имя пользователя"
            id="username-input"
            className="form__input form-profile__input"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            value={name || ''}
            onChange={handleChangeName}
          />
          <span className="form__input-error username-input-error"></span>
        </label>
        <label className="form__field">
          <input
            type="text"
            name="Сфера деятельности"
            id="job-input"
            className="form__input form-profile__input"
            placeholder="Сфера деятельности"
            minLength="2"
            maxLength="200"
            required
            value={description || ''}
            onChange={handleChangeDescription}
          />
          <span className="form__input-error job-input-error"></span>
        </label>
  </PopupWithForm>
  );
} 

export default EditProfilePopup