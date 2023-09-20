import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card({card, onCardClick, onCardLikeDelete, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `card__like-button ${isLiked && 'card__like-button_active'}` 
  )

  function handleClick() {
    onCardClick(card)
  }

  function handleLikeClick(){
    isLiked ?
    onCardLikeDelete(card)
    : onCardLike(card)
  }

  function handleDeleteClick(){
    onCardDelete(card)
  }

  return (
    <article className="card">
      {isOwn && <button type="button" className="card__delete" onClick={()=>{handleDeleteClick()}}/>}
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={()=>{handleClick()}}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likeBox">
          <button type="button"  onClick={()=>{handleLikeClick()}} className={cardLikeButtonClassName}/>
          <span className="card__numberLikes">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card