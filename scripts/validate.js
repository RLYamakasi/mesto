const ValidationData = {
  formSelector: ".form__field",
  formLabel: ".form__label",
  inputSelector: ".form__profile",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__profile_error",
  errorClass: "form__error_active",
};

const showInputError = (formElement,inputElement,errorMessage,ValidationData) => { 
const errorELement = formElement.querySelector(`#${inputElement.id}-error`);
inputElement.classList.add(ValidationData.inputErrorClass);
errorELement.textContent = errorMessage;
errorELement.classList.add(ValidationData.errorClass);
};

const hideInputError = (formElement,inputElement,ValidationData) => {
const errorELement = formElement.querySelector(`#${inputElement.id}-error`);
inputElement.classList.remove(ValidationData.inputErrorClass);
errorELement.textContent = "";
errorELement.classList.remove(ValidationData.errorClass);
};

const checkInputValidity = (formElement,inputElement,ValidationData) => {
if (!inputElement.validity.valid) {
  showInputError(formElement,inputElement,inputElement.validationMessage,ValidationData);
} else {
  hideInputError(formElement,inputElement,ValidationData);
}
};

const hasInvalidInput = (inputList) => {
return inputList.some((input) => !input.validity.valid);
};

const tooggleButtonState = (inputList,buttonsSubmit,ValidationData) => {
if (hasInvalidInput(inputList)) {
  disableSubmitButton(buttonsSubmit,ValidationData);
} else {
  buttonsSubmit.classList.remove(ValidationData.inactiveButtonClass);
  buttonsSubmit.disabled = false; 
}
};

const disableSubmitButton = (buttonsSubmit,ValidationData) =>{
  buttonsSubmit.classList.add(ValidationData.inactiveButtonClass);
  buttonsSubmit.disabled = true; 
}

const setEventListener = (formElement,ValidationData) => {
const inputList = Array.from(
  formElement.querySelectorAll(ValidationData.inputSelector)
);
const buttonsSubmit = formElement.querySelector( 
  ValidationData.submitButtonSelector 
); 
tooggleButtonState(inputList,buttonsSubmit,ValidationData);
inputList.forEach((inputElement) => {
  inputElement.addEventListener("input", function() {
    checkInputValidity(formElement, inputElement,ValidationData);
    tooggleButtonState(inputList,buttonsSubmit,ValidationData);
  });
});
};

const validation = (ValidationData) => {
const formList = Array.from(
  document.querySelectorAll(ValidationData.formSelector)
);
formList.forEach((formElement) => {
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  setEventListener(formElement,ValidationData);
});
};

validation(ValidationData);