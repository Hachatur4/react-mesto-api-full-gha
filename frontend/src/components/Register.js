import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';

function Register({setInfoTooltipOk, setInfoTooltipErr, }) {
  
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate(); 

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    auth.register(password, email)
    .then((res) => {
      if(!res || res.statusCode === 400) throw new Error('Что-то не так');
      return res;
    })
    .then((res)=>{
      setEmail('')
      setPassword('')
      setInfoTooltipOk()
      navigate('/login')
    })
    .catch((err)=>{
      setInfoTooltipErr()
      console.log(err.message)
    })
  }

  return (
      <div className="signInPage signInPage_opened">
        <div className="signIn__container">
          <h3 className="signIn___title">Регистрация</h3>
          <form name="form-register" className="form form-register" noValidate onSubmit={handleSubmit}>
            <fieldset className="form__set">
            <label className="form__field">
              <input
                type="email"
                name="email"
                id="email-input"
                className="form__input-log-reg"
                placeholder="Email"
                minLength="2"
                maxLength="40"
                required
                value={email}
                onChange={handleChangeEmail}
              />
              <span className="form__input-error username-input-error"></span>
            </label>
            <label className="form__field">
              <input
                type="password"
                name="password"
                id="password-input"
                className="form__input-log-reg"
                placeholder="Пароль"
                minLength="2"
                maxLength="200"
                required
                value={password}
                onChange={handleChangePassword}
              />
              <span className="form__input-error job-input-error"></span>
            </label>
              <button type="submit" className={`form__submit-button-log-reg`}>
              Зарегестрироваться
              </button>
            </fieldset>
            <span className='form-link'>Уже зарегистрированы? <Link to="/login" className="form-link">Войти</Link></span>
          </form>
        </div>
      </div>
  );
} 

export default Register