import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarInput = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarInput.current.value
    });
  } 

  React.useEffect(() => {
    avatarInput.current.value = currentUser.avatar;
  }, [currentUser]);

  return (
    <PopupWithForm 
        name="avatar"
        title="Обновить аватар"
        children=""
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        buttonSubmitText={'Сохранить'}>
          <input 
            type="url" 
            placeholder="Ссылка на картинку" 
            className="popup__input popup__input_name_link-avatar" 
            name="avatar-input" 
            id="avatar-input" 
            required
            ref={avatarInput}
          />
          <span 
            className='popup__input-error' 
            id='avatar-input-error'>Заполните это поле.</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;