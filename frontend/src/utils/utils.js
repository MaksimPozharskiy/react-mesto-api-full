// // ____________________________________________________
// // =================== Переменные =====================
// // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// ==Попап редактирования профиля==
const profileSelectors = {
  profileNameSelector: '.profile__name', 
  profileProfessionSelector: '.profile__profession',
  profileAvatarSelector: '.popup_type_avatar'
}
const userId = 'fdbdaccad2c90e74c623abba';
const profileName = document.querySelector(profileSelectors.profileNameSelector);
const profileProfession = document.querySelector(profileSelectors.profileProfessionSelector);
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit')
const popupEditSelector = '.popup_type_edit';
const popupCloseButtonSelector = '.popup__button-close';
const popupEditForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_name_name');
const professionInput = popupEdit.querySelector('.popup__input_name_profession');

// ==Попап редактирования аватара==
const avatarImage = document.querySelector('.profile__avatar')
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarButton = document.querySelector('.profile__avatar-wrapp')
const popupAvatarForm = popupAvatar.querySelector('.popup__form');
const popupAvatarInput = popupAvatar.querySelector('.popup__input_name_link-avatar');
const popupAvatarSubmitButton = popupAvatar.querySelector('.popup__button-save');

// ==Попап увеличения картинки==
const popupImageWrap = document.querySelector('.popup_type_image');
const popupImageSelector = '.popup_type_image';
const imageSelector = '.popup__image';
const popupImageTitleSelector = '.popup__title-image';

// ==Попап добавления карточки==
const popupAddSelector = '.popup_type_add';
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const titleCardInput = popupAdd.querySelector('.popup__input_name_title-card');
const linkCardInput = popupAdd.querySelector('.popup__input_name_link-card');

// ==Попап подтверждения==
const popupConfirmSelector = '.popup_type_confirm';

// ==Добавление карточки пользователем==
const gridCardTemplateId = '#grid-item';

// ==Кнопки закрытия попапов==
const keyCodeEsc = 27;

// Контейнер карточек
const container = document.querySelector('.grid-photos');

export {
  profileSelectors,
  userId,
  profileName,
  profileProfession,
  popupAvatar,
  avatarImage,
  popupAvatarForm,
  popupAvatarButton,
  popupAvatarInput,
  popupAvatarSubmitButton,
  popupEditOpenButton,
  popupEdit,
  popupEditSelector,
  popupCloseButtonSelector,
  popupEditForm,
  nameInput,
  professionInput,
  popupImageWrap,
  popupImageSelector,
  imageSelector,
  popupImageTitleSelector,
  popupAddSelector,
  popupAddOpenButton,
  popupAddForm,
  titleCardInput,
  linkCardInput,
  gridCardTemplateId,
  popupConfirmSelector,
  keyCodeEsc,
  popupAdd,
  container
  }