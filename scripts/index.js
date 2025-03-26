// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template");
const placesList = document.querySelector(".places__list");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
popupTypeEdit.classList.add("popup_is-animated");
popupTypeNewCard.classList.add("popup_is-animated");
popupTypeImage.classList.add("popup_is-animated");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupInputIypeName = document.querySelector(".popup__input_type_name");
const popupInputTypeDescription = document.querySelector(
  ".popup__input_type_description"
);
const popupInputIypeCardName = document.querySelector(
  ".popup__input_type_card-name"
);
const popupInputTypeUrl = document.querySelector(".popup__input_type_url");

drawCard(initialCards);

profileEditButton.addEventListener("click", () => {
  const popupClose = popupTypeEdit.querySelector(".popup__close");
  const popupForm = popupTypeEdit.querySelector(".popup__form");
  fillingProfileEditing();
  openModal(popupTypeEdit);

  popupClose.addEventListener("click", () => {
    closeModal(popupTypeEdit);
  });

  popupForm.addEventListener("submit", handleProfileFormSubmit);
});

profileAddButton.addEventListener("click", () => {
  const popupClose = popupTypeNewCard.querySelector(".popup__close");
  const popupForm = popupTypeNewCard.querySelector(".popup__form");
  popupInputIypeCardName.value = "";
  popupInputTypeUrl.value = "";
  openModal(popupTypeNewCard);

  popupClose.addEventListener("click", () => {
    closeModal(popupTypeNewCard);
  });

  popupForm.addEventListener("submit", handleCardsFormSubmit);
});

function drawCard(cards) {
  placesList.innerHTML = "";
  cards.forEach((element) => {
    placesList.append(createCard(element.name, element.link));
  });
}

function createCard(name, link) {
  const cardEl = cardTemplate.content.cloneNode(true);
  const cardImage = cardEl.querySelector(".card__image");
  const cardTitle = cardEl.querySelector(".card__title");
  cardImage.alt = name;
  cardImage.src = link;
  cardTitle.textContent = name;

  const cardLikeButton = cardEl.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });

  cardImage.addEventListener("click", () => {
    openModal(popupTypeImage);
    const popupCaption = popupTypeImage.querySelector(".popup__caption");
    const popupImage = popupTypeImage.querySelector(".popup__image");
    popupCaption.textContent = cardImage.alt;
    popupImage.src = cardImage.src;

    const popupClose = popupTypeImage.querySelector(".popup__close");
    popupClose.addEventListener("click", () => {
      closeModal(popupTypeImage);
    });
  });

  const cardDeleteButton = cardEl.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    // cardDeleteButton.closest("li").remove();
    const nameOfCard =
      cardDeleteButton.nextElementSibling.querySelector(
        ".card__title"
      ).textContent;

    initialCards.map((item, index) => {
      if (item.name == nameOfCard) {
        initialCards.splice(index, 1);
        drawCard(initialCards);
      }
    });
  });

  return cardEl;
}

function fillingProfileEditing() {
  popupInputIypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = popupInputIypeName.value;
  profileDescription.textContent = popupInputTypeDescription.value;
  closeModal(popupTypeEdit);
}

function handleCardsFormSubmit(event) {
  event.preventDefault();
  initialCards.unshift({
    name: popupInputIypeCardName.value,
    link: popupInputTypeUrl.value,
  });
  drawCard(initialCards);
  closeModal(popupTypeNewCard);
}

function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}