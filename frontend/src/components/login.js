import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';

function Login({handleLoginAndGetMail, setLoggedIn, setCurrentUser}) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password){
      return;
    }
    auth.authorize(email, password)
      .then((res) => {
        console.log(res)
        if(!res) throw new Error('Неправильное имя пользователя или пароль');
        if (res.token){
          localStorage.setItem('jwt', res.token);
          setEmail('')
          setPassword('')
          setCurrentUser(res.user)
          /*setLoggedIn(true)*/
          handleLoginAndGetMail(email)
          navigate('/cards', {replace: true});
        }
      })
      .catch((err)=>{
        console.log(err.message)
      })
  }

  return (
      <div className="signInPage signInPage_opened">
        <div className="signIn__container">
          <h3 className="signIn___title">Вход</h3>
          <form name="form-login" className="form form-login" noValidate onSubmit={handleSubmit}>
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
                Войти
              </button>
            </fieldset>
          </form>
        </div>
    </div>
  );
} 

export default Login