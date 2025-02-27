

export function createCard(name, img='#', openModal, closeModal, closeModalByEscape) {
    const cardTemplate = document.querySelector('#card-template').content;

    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardDeleteButton = card.querySelector('.card__delete-button');

    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');

    cardTitle.textContent = name;
    cardImage.src = img;
    cardImage.alt = name;

    // лайк карточки
    cardLikeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__like-button_is-active');
    });

    // удаление карточки
    cardDeleteButton.addEventListener('click', (evt) => {
        deleteCard(card);

    });

    cardImage.addEventListener('click', (evt) => {
        popupImage.src = img;
        popupCaption.textContent = name;
        openModal(imagePopup);
        document.addEventListener('keydown', closeModalByEscape);
    });

    imagePopup.querySelector('.popup__close').addEventListener('click', () => {
        closeModal(imagePopup);
        document.removeEventListener('keydown', closeModalByEscape);
    });

    return card;
}

// @todo: Функция удаления карточки
export function deleteCard(card) {
    card.remove();
}