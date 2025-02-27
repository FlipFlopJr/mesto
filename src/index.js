import { initialCards } from './components/cards.js';
import './pages/index.css'; // добавьте импорт главного файла стилей 
import { createCard, deleteCard } from './components/card.js';
import { openModal, closeModal, closeModalByEscape, closeModalOnOverlayClick } from './components/modal.js';
import { enableValidation, toggleButtonState } from './components/validate.js';


const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

imagePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
profilePopup.classList.add('popup_is-animated');


const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfilePopupButton = profilePopup.querySelector('.popup__close');

initialCards.forEach(card => {
    const cardElement = createCard(card.name, card.link, openModal, closeModal, closeModalByEscape);
    document.querySelector('.places__list').append(cardElement);
});

document.addEventListener('mousedown', closeModalOnOverlayClick); // Добавляем слушатель на клик по оверлею

editProfileButton.addEventListener('click', () => {
    fillProfilePopupForm();
    openModal(profilePopup);
    document.addEventListener('keydown', closeModalByEscape); // Добавляем слушатель на Escape

    const inputList = Array.from(profilePopup.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = profilePopup.querySelector(validationSettings.submitButtonSelector); // Замените на ваш селектор кнопки
    toggleButtonState(inputList, buttonElement, validationSettings); // Обновляем состояние кнопки
    
});

closeProfilePopupButton.addEventListener('click', () => {
    closeModal(profilePopup);
    document.removeEventListener('keydown', closeModalByEscape); // Удаляем слушатель на Escape
});

function fillProfilePopupForm(){
    const title = document.querySelector('.profile__title');
    const description = document.querySelector('.profile__description');

    const inputName = profilePopup.querySelector('.popup__input_type_name');
    const inputDescription = profilePopup.querySelector('.popup__input_type_description');

    inputName.value = title.textContent;
    inputDescription.value = description.textContent;
}

const profileFormElement = profilePopup.querySelector('.popup__form');

profileFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const nameInput = profilePopup.querySelector('.popup__input_type_name');
    const jobInput = profilePopup.querySelector('.popup__input_type_description');

    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    closeModal(profilePopup);
    document.removeEventListener('keydown', closeModalByEscape);
});


const addImgButton = document.querySelector('.profile__add-button');
const closeCardPopupButton = cardPopup.querySelector('.popup__close');
addImgButton.addEventListener('click', () => {
    openModal(cardPopup);
    document.addEventListener('keydown', closeModalByEscape);

});

closeCardPopupButton.addEventListener('click', () => {
    closeModal(cardPopup);
    document.removeEventListener('keydown', closeModalByEscape);
});

const cardFormElement = cardPopup.querySelector('.popup__form');

cardFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const nameInput = cardPopup.querySelector('.popup__input_type_card-name');
    const urlInput = cardPopup.querySelector('.popup__input_type_url');

    const cardElement = createCard(nameInput.value, urlInput.value, openModal, closeModal, closeModalByEscape);
    document.querySelector('.places__list').prepend(cardElement);
    closeModal(cardPopup);
    document.removeEventListener('keydown', closeModalByEscape);
});



const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
  
  
enableValidation(validationSettings);

