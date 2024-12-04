
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");
// const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const imageLinkPopup = imagePopup.querySelector(".popup__image");
const imageCaptionPopup = imagePopup.querySelector(".popup__caption");

// Плавное открытие попапов
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем класс popup_is-animated ко всем попапам при загрузке
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.classList.add('popup_is-animated');
    });
});

// Открытие/закрытие модальных окон
function toggleModal(popup, isOpen) {
    popup.classList.toggle('popup_is-opened', isOpen);
}

// Заполнение данных модального окна с изображением
function fillImagePopupData(caption, link) {
    imageCaptionPopup.textContent = caption;
    imageLinkPopup.src = link;
}


// Создание карточки
function createCard(src, title) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const image = cardElement.querySelector(".card__image");
    const titleElement = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    image.src = src;
    titleElement.textContent = title;

    // Обработчик лайка
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    // Обработчик удаления карточки
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

    // Обработчик клика по изображению
    image.addEventListener('click', () => {
        fillImagePopupData(title, src);
        toggleModal(imagePopup, true);
    });

    return cardElement;
}

imagePopup.querySelector('.popup__close').addEventListener('click', () => toggleModal(imagePopup, false));

// Отображение всех карточек на странице
function drawCards() {
    initialCards.forEach(({ name, link }) => {
        const card = createCard(link, name);
        cardsList.append(card);
    });
}


// Обработчик открытия/закрытия модальных окон для профиля
document.querySelector('.profile__edit-button').addEventListener('click', () => toggleModal(profilePopup, true));
profilePopup.querySelector('.popup__close').addEventListener('click', () => toggleModal(profilePopup, false));


// Обработчик формы редактирования профиля
const profileFormElement = document.querySelector('.popup_type_edit');
profileFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const nameInput = profileFormElement.querySelector('.popup__input_type_name');
    const jobInput = profileFormElement.querySelector('.popup__input_type_description');
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    toggleModal(profilePopup, false);
});

// Обработчик открытия/закрытия модального окна для добавления карточки
document.querySelector('.profile__add-button').addEventListener('click', () => toggleModal(cardPopup, true));
cardPopup.querySelector('.popup__close').addEventListener('click', () => toggleModal(cardPopup, false));


// Обработчик формы добавления новой карточки
const placeFormElement = cardPopup.querySelector('.popup__form');
placeFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cardNameInput = placeFormElement.querySelector('.popup__input_type_card-name');
    const cardLinkInput = placeFormElement.querySelector('.popup__input_type_url');
    const newCard = createCard(cardLinkInput.value, cardNameInput.value);
    cardsList.prepend(newCard);
    toggleModal(cardPopup, false);
});


// Инициализация: выводим начальные карточки
drawCards();

