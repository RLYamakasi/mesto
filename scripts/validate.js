export const ValidationData = {
  formSelector: ".form__field",
  formLabel: ".form__label",
  inputSelector: ".form__profile",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__profile_error",
  errorClass: "form__error_active",
};


export default class FormValidator {
  constructor(ValidationData, formElement){
    this.formSelector = ValidationData.formSelector;
    this.formLabel = ValidationData.formLabel;
    this.inputSelector = ValidationData.inputSelector;
    this.submitButtonSelector = ValidationData.submitButtonSelector;
    this.inactiveButtonClass = ValidationData.inactiveButtonClass;
    this.inputErrorClass = ValidationData.inputErrorClass;
    this.errorClass = ValidationData.errorClass;
    this.formElement = formElement;
    this.buttonElement = this.formElement.querySelector(
      this.submitButtonSelector
    );
    this.inputList = Array.from(
      this.formElement.querySelectorAll(this.inputSelector)
    );
  }

  __checkInputValidity = (formElement,inputElement) => {
    if (!inputElement.validity.valid) {
      this.__showInputError(formElement,inputElement,inputElement.validationMessage);
    } else {
      this.__hideInputError(formElement,inputElement);
    }
    }; 

  __showInputError = (formElement,inputElement,errorMessage) => { 
    const errorELement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorELement.textContent = errorMessage;
    errorELement.classList.add(this.errorClass);
  };

  __hideInputError = (formElement,inputElement) => {
    const errorELement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorELement.textContent = "";
    errorELement.classList.remove(this.errorClass);
  };

  __hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
  };
  
  __toggleButtonState = (inputList,buttonsSubmit) => {
  if (this.__hasInvalidInput(inputList)) {
    this.__disableSubmitButton(buttonsSubmit);
  } else {
    buttonsSubmit.classList.remove(this.inactiveButtonClass);
    buttonsSubmit.disabled = false; 
  }
  };
  
  __disableSubmitButton = (buttonsSubmit) =>{
    buttonsSubmit.classList.add(this.inactiveButtonClass);
    buttonsSubmit.disabled = true; 
  }
  
  __setEventListener = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(this.inputSelector)
    );
    const buttonsSubmit = formElement.querySelector( 
      this.submitButtonSelector 
    ); 

  this.__toggleButtonState(inputList,buttonsSubmit);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
  this.__toggleButtonState(inputList,buttonsSubmit);
  this.__checkInputValidity(formElement,inputElement);
      
    });
  });
  };
  
   validation = () => {
    const formList = Array.from(
      document.querySelectorAll(this.formSelector)
    );
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this.__setEventListener(formElement);
    });
}
}
