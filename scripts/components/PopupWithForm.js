import Popup from "../components/Popup.js";


export class PopupWithForm extends Popup{
    constructor(popup,handleFormSubmit) {
      super(popup);
      this._selector = popup;
      this._handleFormSubmit = handleFormSubmit;
      this.formElement = this._selector.querySelector('.form__field');
      this._inputList = Array.from(
        this.formElement.querySelectorAll('.form__profile')
      );
    }
  
    _setEventListeners() {
      super.setEventListeners()
      this.formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.formElement.reset();
      })
    }
  
    _getInputValues() {
      this._formValues = {};
      this._inputList.forEach(input => this._formValues[input.name] = input.value);
      console.log(this._formValues)
      return this._formValues;
    }
  
    generate() {
      this._setEventListeners();
      return this.formElement;
    }
    
closePopup(){ 
  super.closePopup();
  this.formElement.reset()
} 
  }

  

  // constructor(validationData, formElement) {
  //   this._formSelector = validationData.formSelector;
  //   this._formLabel = validationData.formLabel;
  //   this._inputSelector = validationData.inputSelector;
  //   this._submitButtonSelector = validationData.submitButtonSelector;
  //   this._inactiveButtonClass = validationData.inactiveButtonClass;
  //   this._inputErrorClass = validationData.inputErrorClass;
  //   this._errorClass = validationData.errorClass;
  //   this._formElement = formElement;
  //   this._buttonElement = this._formElement.querySelector(
  //     this._submitButtonSelector
  //   );
  //   this._inputList = Array.from(
  //     this._formElement.querySelectorAll(this._inputSelector)
  //   );
  // }