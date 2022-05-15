const enableValidation = {
  formSelector: ".form__field",
  formLabel: ".form__label",
  inputSelector: ".form__profile",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__profile_error",
  errorClass: "form__error_active",
};

const showInputError = (formElement, inputElement, errorMessage) => { 
const errorELement = formElement.querySelector(`#${inputElement.id}-error`);
inputElement.classList.add(enableValidation.inputErrorClass);
errorELement.textContent = errorMessage;
errorELement.classList.add(enableValidation.errorClass);
};


const hideInputError = (formElement, inputElement) => {
const errorELement = formElement.querySelector(`#${inputElement.id}-error`);
inputElement.classList.remove(enableValidation.inputErrorClass);
errorELement.textContent = "";
errorELement.classList.remove(enableValidation.errorClass);
};

const checkInputValidity = (formElement, inputElement) => {
if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage);
} else {
  hideInputError(formElement, inputElement);
}
};

const hasInvalidInput = (inputList) => {
return inputList.some((input) => !input.validity.valid);
};



const tooggleButtonState = (inputList, buttonsSubmit) => {
if (hasInvalidInput(inputList)) {
  buttonsSubmit.classList.add(enableValidation.inactiveButtonClass);
} else {
  buttonsSubmit.classList.remove(enableValidation.inactiveButtonClass);
}
};

const setEventListener = (formElement) => {
const inputList = Array.from(
  formElement.querySelectorAll(enableValidation.inputSelector)
);
const buttonsSubmit = formElement.querySelector(
  enableValidation.submitButtonSelector
);
tooggleButtonState(inputList, buttonsSubmit);
inputList.forEach((inputElement) => {
  inputElement.addEventListener("input", function () {
    checkInputValidity(formElement, inputElement);
    tooggleButtonState(inputList, buttonsSubmit);
  });
});
};

const validation = () => {
const formList = Array.from(
  document.querySelectorAll(enableValidation.formSelector)
);
formList.forEach((formElement) => {
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  setEventListener(formElement);
});
};

