import React, { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import * as Auth from '../utils/auth';
import registrationOk from '../images/registration-ok.svg';
import registrationNoOK from '../images/login-fail.svg';
const escapeHtml = require('escape-html')

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({_id: null, avatar: ''});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState({ iconPath: '', text: '' });
  const [email, setEmail] = React.useState('');
  const history = useHistory();


  React.useEffect(() => {
    api.getUserInfo().then((user) => setCurrentUser(user.data))
    .catch(error => api.errorHandler(error));
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      Auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch(err => console.log(err));
    }
  }, [history]);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleInfoTooltipPopupOpen() {
    setIsInfoTooltipPopupOpen(true);
  }
  function handleInfoTooltipContent({iconPath, text}) {
    setMessage({ iconPath: iconPath, text: text })
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleUpdateUser({name, about}) {
    api.editUserInfo(name, about).then(() => {
      const updatedUser = { ...currentUser };
        updatedUser.name = name;
        updatedUser.about = about;

        setCurrentUser({ ...updatedUser });
      setIsEditProfilePopupOpen(false);
    })
    .catch(error => api.errorHandler(error));
  }

  function handleUpdateAvatar({avatar}) {
    api.editUserAvatar(avatar).then((updatedUser) => {
      setCurrentUser(updatedUser);
      setIsEditAvatarPopupOpen(false);
      console.log(updatedUser);
    })
    .catch(error => api.errorHandler(error));
  }

  React.useEffect(() => {
    api.getInitialCards().then(cardList => {
      setCards(cardList);
    })
    .catch(error => api.errorHandler(error))
  }, []);

  // Карточки
  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    const changeLike = isLiked ? api.unlikeCard(card._id) : api.likeCard(card._id)
    changeLike.then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
    .catch(error => api.errorHandler(error));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
    .catch(error => api.errorHandler(error));
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addCard(name, link).then((card) => {
      setCards([card.data, ...cards]);
      setIsAddPlacePopupOpen(false);
    })
    .catch(error => api.errorHandler(error));
  }

  useEffect(() => {
    function hadleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', hadleEscClose);
    return () => {
      document.removeEventListener('keydown', hadleEscClose);
    }
  }, []);
  // Регистрация
  function registration(email, password) {
    Auth.register(email, escapeHtml(password)).then((res) => {
      if(res.status === 201 || res.status === 200){
        handleInfoTooltipContent({iconPath: registrationOk, text: 'Вы успешно зарегистрировались!'})
        handleInfoTooltipPopupOpen();
        // Перенаправляем на страницу логина спустя 3сек и закрываем попап
        setTimeout(history.push, 3000, "/sign-in");
        setTimeout(closeAllPopups, 2500);
      }
      if(res.status === 400) {
        console.log('Введный емейл ужезарегестрирован')
      }
    }).catch((err)=> {
      handleInfoTooltipContent({iconPath: registrationNoOK, text: 'Что-то пошло не так! Попробуйте ещё раз.'})
      handleInfoTooltipPopupOpen();
      setTimeout(closeAllPopups, 2500);
      console.log(err)
    })
  }
  // Авторизация 
  function authorization(email, password) {
    Auth.authorize(email, escapeHtml(password) )
    .then((data) => {
      if (!data) {
        throw new Error('Произошла ошибка');
      }
      Auth.getContent(data)
        .then((res) => {
          setEmail(res.data.email);
        }).catch(err => console.log(err));
        setLoggedIn(true);

        api.getUserInfo().then((user) => setCurrentUser(user.data))
        .catch(error => api.errorHandler(error));
        
        
        handleInfoTooltipContent({iconPath: registrationOk, text: 'Вы успешно авторизовались!'})
        handleInfoTooltipPopupOpen();
        // Перенаправляем на главную страницу спустя 3сек и закрываем попап
        setTimeout(history.push, 3000, "/");
        setTimeout(closeAllPopups, 2500);
    }).catch((err) => {
      handleInfoTooltipContent({iconPath: registrationNoOK, text: 'Что то пошло не так!'})
      handleInfoTooltipPopupOpen();
      console.log(err)
    })
  }

  // Выход из учетки
  function handleSignOut() {
    setCurrentUser({_id: null, avatar: ''})
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    api.updateHeaders();
    setEmail('');
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={email} handleSignOut={handleSignOut} />
        <Switch>
          {currentUser._id && <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} // Рендерим элемент только после того как пришел ответ от React.useEffect
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />}
          <Route path="/sign-in">
            <Login 
              authorization={authorization}
            />
          </Route>
          <Route path="/sign-up">
            <Register 
              registration={registration}
            />
          </Route>
          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
      </div>
      {currentUser &&
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
          /> 
      }
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      {currentUser &&
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}   
        /> 
      }
      <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups}
      />
      {currentUser &&
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen} 
            onClose={closeAllPopups} 
            message={message}
          /> 
        }
    </CurrentUserContext.Provider>
  );
}

export default App;
