
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");
const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");


function createCard(src, title) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__image").src = src;
    cardElement.querySelector(".card__title").textContent = title;
    return cardElement
}


// @todo: Вывести карточки на страницу
function drawCards() {
    initialCards.forEach(function addCard(item) {
        const card = createCard(item.link, item.name)
        cardsList.append(card)
    })
}

drawCards();




// @todo: функция открытия модального окна
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

// @todo: функция закрытия модального окна
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}


// @todo: DOM узлы


// @todo: Profile modal window
const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = profilePopup.querySelector('.popup__close');

openEditButton.addEventListener('click', () => openModal(profilePopup));
closeEditButton.addEventListener('click', () => closeModal(profilePopup));

// @todo: Save edited profile info
const profileFormElement = document.querySelector('.popup_type_edit');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');


function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;

    closeModal(profileFormElement);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);


// @todo: Открытие/заккрытие модального окна добавления карточки


const openCardButton = document.querySelector('.profile__add-button');
const closeCardButton = cardPopup.querySelector('.popup__close');

openCardButton.addEventListener('click', () => openModal(cardPopup));
closeCardButton.addEventListener('click', () => closeModal(cardPopup));






// @todo: Функция удаления карточки
const cardDeleteButtons = document.querySelectorAll('.card__delete-button');

cardDeleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const parentElement = button.closest('.card')
        parentElement.remove();
    })
})



// @todo: Функция создания карточки
const placeFormElement = document.querySelector('.popup_type_new-card');

const cardNameInput = placeFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = placeFormElement.querySelector('.popup__input_type_url');


function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const card = createCard(cardLinkInput.value, cardNameInput.value);
    cardsList.prepend(card);
    closeModal(placeFormElement);
    // drawCards();
}

placeFormElement.addEventListener('submit', handleCardFormSubmit);


// @todo: Функция лайка  карточки
const cardLikeButtons = document.querySelectorAll('.card__like-button');

cardLikeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.toggle('card__like-button_is-active')
    })
})
