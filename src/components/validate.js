
export function enableValidation(validationSettings) {
    const formList = Array.from(document.querySelectorAll(`${validationSettings.formSelector}`));
      formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
        });
        setEventListeners(formElement, validationSettings);
      });
    }
    
    
    function setEventListeners(formElement, validationSettings) {
        const inputList = Array.from(formElement.querySelectorAll(`${validationSettings.inputSelector}`));
        const buttonElement = formElement.querySelector(`${validationSettings.submitButtonSelector}`);
        toggleButtonState(inputList, buttonElement, validationSettings);
        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validationSettings);
            toggleButtonState(inputList, buttonElement, validationSettings);
          });
        });
    }
    
    export function toggleButtonState(inputList, buttonElement, validationSettings){ // включение и выключение
        if (hasInvalidInput(inputList)) {
          buttonElement.classList.add(validationSettings.inactiveButtonClass);
        } else {
          buttonElement.classList.remove(validationSettings.inactiveButtonClass);
        }
      };
      
    
    function checkInputValidity(formElement, inputElement, validationSettings) {
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
          } else {
            hideInputError(formElement, inputElement, validationSettings);
        }
    }
    
    function hasInvalidInput(inputList){ // сама проверка массива полей
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
    }
    
    const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
      const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
      inputElement.classList.add(validationSettings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(validationSettings.errorClass);
    };
    
    const hideInputError = (formElement, inputElement, validationSettings) => {
      const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
      inputElement.classList.remove(validationSettings.inputErrorClass);
      errorElement.classList.remove(validationSettings.errorClass);
      errorElement.textContent = '';
    };