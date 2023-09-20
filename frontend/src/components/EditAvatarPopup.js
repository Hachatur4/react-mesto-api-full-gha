import {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const [value, setValue] = useState('');

  function handleChange (e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: value,
    });
  }

  useEffect(() => {
    setValue('')
  }, [isOpen]); 
  
  return (
      <PopupWithForm 
      name='changeAvatar' 
      title='Обновить аватар' 
      buttonTitle='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
          <label className="form__field">
            <input
              type="url"
              name="avatarLink"
              id="avatar-input"
              className="form__input form-avatar__input"
              placeholder="Ссылка на изображение"
              required
              value={value}
              onChange={handleChange}
            />
            <span className="form__input-error avatar-input-error"></span>
          </label>
      </PopupWithForm>
  );
} 

export default EditAvatarPopup