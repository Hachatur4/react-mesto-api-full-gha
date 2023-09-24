import React from 'react'
import Card from './Card.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Main ({
  onCardClick,
  onCardLike,
  onCardLikeDelete,
  onCardDelete,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards
}) {

  const currentUser = React.useContext(CurrentUserContext);
  return (
      <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar" onClick={onEditAvatar}>
            <span className="profile__avatar-pencil"></span>
            <img
              className="profile__avatar-image"
              src={currentUser.user.avatar}
              alt="Изображение профиля"
            />
          </div>
          <div className="profile__info">
            <div className="profile__name-edit">
              <h1 className="profile-content profile__name">{currentUser.user.name}</h1>
              <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
            </div>
            <p className="profile-content profile__job">{currentUser.user.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button"  onClick={onAddPlace}></button>
      </section>
      <section className="element">
      {cards.map((card) =>(
        <Card
        key={card._id}
        card={card}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardLikeDelete={onCardLikeDelete}
        onCardDelete={onCardDelete}
        />
        ))}
      </section>
    </main>
  )
}

export default Main;