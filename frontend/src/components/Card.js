import deleteIcon from '../images/delete-icon.svg';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  // Контекст
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `${isOwn ? 'grid-item__delete-icon' : 'grid-item__delete-icon_hidden'}`
  ); 

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(item => item._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `grid-item__like ${isLiked ? 'grid-item__like_liked' : ''}`; 

  function handleClick() {
    onCardClick(card);
  } 

  function handleLikeClick () {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="grid-item">
      <img src={deleteIcon} alt="Удаление карточки" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
      <img src={card.link} alt={card.name} className="grid-item__image" onClick={handleClick} />
      <div className="grid-item__wrap">
        <h3 className="grid-item__name">{card.name}</h3>
        <div className="grid-item__like-container">
          <svg className={cardLikeButtonClassName} width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleLikeClick}>
            <path  d="M19.154 9.33822C21.294 7.19832 21.294 3.72364 19.154 1.60492C17.014 -0.534975 13.5392 -0.534975 11.3992 1.60492L10.361 2.66428L9.32276 1.62611C7.18277 -0.534975 3.70792 -0.534975 1.58911 1.60492C0.550891 2.64309 0 4.02026 0 5.48217C0 6.94408 0.572079 8.32124 1.58911 9.35941L10.361 18.1309L19.154 9.33822Z" />
          </svg>
          <p className="grid-item__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;