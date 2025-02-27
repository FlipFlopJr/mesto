function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

// закрытие модального окна
function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}

function closeModalByEscape(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        closeModal(openPopup);
        document.removeEventListener('keydown', closeModalByEscape);
    }
}

function closeModalOnOverlayClick(evt) {
    const popup = evt.target.classList.contains('popup'); // Проверяем, что клик был на оверлей
    if (popup) {
        const openPopup = document.querySelector('.popup_is-opened');
        closeModal(openPopup);
    }
}

export { openModal, closeModal, closeModalByEscape, closeModalOnOverlayClick };