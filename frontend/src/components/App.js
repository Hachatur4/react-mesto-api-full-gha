import {React, useState, useEffect} from 'react';
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup.js'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import api from '../utils/api.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import Login from './login.js'
import Register from './Register'
import Header from './Header';
import InfoTooltip from './InfoTooltip.js'
import ProtectedRouteElement from './ProtectedRoute';
import imgTooltipOk from '../images/popup/popup-status-ok.svg';
import imgTooltipErr from '../images/popup/popup-status-error.svg';
import * as auth from '../utils/auth.js';


function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [infoTooltipMessage, setInfoTooltipMessage] = useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false); 
  const [userEmail, setUserEmail] = useState('')

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const navigate = useNavigate()

  const handleLoginAndGetMail = (mail) => {
    setLoggedIn(true);
    setUserEmail(mail)
  }

  useEffect(() => {
    handleTokenCheck();
  }, [])

  const handleTokenCheck = () => {
    const token = localStorage.getItem('jwt') 
    if (token){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          if (res){
            setUserEmail(res.user.email)
            setCurrentUser(res)
            navigate("/cards", {replace: true})
            setLoggedIn(true);
          }
        })
        .catch((err)=> console.log(`catch: ${err}`))
    }
  }

  function handleRegistrationStatusOk(){
    setInfoTooltipMessage({
        text: "Вы успешно зарегистрировались!",
        icon: imgTooltipOk,
        altIcon: "Изображение выполненного статуса регистрации"
    })
    setIsInfoTooltipOpen(true)
  }
  function handleRegistrationStatusErr(){
    setInfoTooltipMessage({
      text: "Что-то пошло не так! Попробуйте ещё раз.",
      icon: imgTooltipErr,
      altIcon: "Изображение невыполненного статуса регистрации"
    })
    setIsInfoTooltipOpen(true)
  }

  useEffect(() => {
    if(loggedIn){
      api.getAppInfo()
      .then(([cards, userData])=>{
        setCards(cards)
        setCurrentUser(userData)
      })
      .catch((err)=> console.log(`catch: ${err}`))
    }
  },[loggedIn]);

  function handleEditAvatarClick (){
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick (){
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick (){
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick (card) {
    setSelectedCard(card)
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
    setIsInfoTooltipOpen(false)
  }

  function handleCardLike(card){
      api.putLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err)=> console.log(`catch: ${err}`))
  }
  function handleCardLikeDelete(card){
    api.deleteLike(card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err)=> console.log(`catch: ${err}`))
  }

  function handleCardDelete(card){
    api.deleteCard(card._id)
    .then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err)=> console.log(`catch: ${err}`))
  }

  function handleUpdateUser(data){
    api.sendUserInfo(data)
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err)=> console.log(`catch: ${err}`))
  }

  function handleUpdateAvatar(data){
    api.updateUserAvatar(data)
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err)=> console.log(`catch: ${err}`))
  }

  function handleAddPlaceSubmit (cardData){
    api.createCard(cardData)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err)=> console.log(`catch: ${err}`))
  }

  function handleLogout (){
    setUserEmail('')
    setLoggedIn(false)
    navigate('/login')
    localStorage.removeItem('jwt')
  }

  function recordUsersMail (mail){
    setUserEmail(mail)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
          loggedIn={loggedIn}
          email={userEmail}
          logout={handleLogout}
        />
        <Routes>
          <Route path="/cards" element={
            <ProtectedRouteElement
            loggedIn={loggedIn}
            element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardLikeDelete={handleCardLikeDelete}
            cards={cards}
            onCardDelete={handleCardDelete}
            userEmail={userEmail}
           />
          } />
          <Route path="/register" element={
            <Register
              loggedIn={loggedIn}
              setInfoTooltipOk={handleRegistrationStatusOk}
              setInfoTooltipErr={handleRegistrationStatusErr}/>
          } />
          <Route path="/login" element={
            <Login
              handleLoginAndGetMail={handleLoginAndGetMail}
              setCurrentUser={setCurrentUser}
            />
          } />
          <Route path="*" element={loggedIn ? <Navigate to="/cards" replace /> : <Navigate to="/login" replace />} />
        </Routes>
      <InfoTooltip
        isOpen={isInfoTooltipOpen} 
        onClose={closeAllPopups}
        message={infoTooltipMessage}/>
      <ImagePopup 
      card={selectedCard} 
      onClose={closeAllPopups}
      />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      <Footer/>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
