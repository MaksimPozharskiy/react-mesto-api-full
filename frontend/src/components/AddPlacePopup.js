import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const nameInput = React.useRef();
  const linkInput = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: nameInput.current.value,
      link: linkInput.current.value
    });
  }

  return (
    <PopupWithForm 
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      buttonSubmitText={'Создать'}>
        <input 
          ref={nameInput}
          minLength="1" 
          maxLength="30" 
          type="text" 
          placeholder="Название" 
          className="popup__input popup__input_name_title-card" 
          name="title-card" 
          id="title-input" 
          required />
        <span 
          className='popup__input-error' 
          id='title-input-error'>Вы пропустили это поле.</span>
        <input 
          ref={linkInput}
          type="url" 
          placeholder="Ссылка на картинку" 
          className="popup__input popup__input_name_link-card" 
          name="link-card" 
          id="link-input" 
          required />
        <span 
          className='popup__input-error' 
          id='link-input-error'>Вы пропустили это поле.</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;