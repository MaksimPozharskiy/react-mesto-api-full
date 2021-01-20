function ImagePopup({card, onClose}) {

  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__wrap">
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__title-image">{card.name}</p>
        <button type="button" className="popup__button-close" onClick={onClose} />
      </div>
    </div>
  );
}

export default ImagePopup;