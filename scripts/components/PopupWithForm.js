import Popup from "../components/Popup.js";

export class PopupWithForm extends Popup{
    constructor({popup, handleFormSubmit }) {
      super(popup);
      this._selector = popup;
      this._handleFormSubmit = handleFormSubmit;
    }
  
    _getElement() {
        const formElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.form')
        .cloneNode(true);
  
      return formElement;
    }
  
    _setEventListeners() {
      this._element.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
  
        this._element.reset();
      })
    }
  
    _getInputValues() {
      this._inputList = this._element.querySelectorAll('.form__input');
      
      this._formValues = {};
      this._inputList.forEach(input => this._formValues[input.name] = input.value);
      
      return this._formValues;
    }
  
    generate() {
      this._element = this._getElement();
      this._setEventListeners();
  
        return this._element;
    }
  
  }