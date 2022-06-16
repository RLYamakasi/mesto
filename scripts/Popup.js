import {popBigImage,popText,placeInput,sourceInput} from "./script.js"

export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._openedPopup = document.querySelector('.pop-up_un-hiden');
        this._popupList = document.querySelectorAll('.pop-up');
    }
    openPopup() {
        this._popup.classList.add('pop-up_un-hiden');
        document.addEventListener('keydown', this._handleCloseByEscKey);
    }
    closePopup() { 
        this._popup.classList.remove('pop-up_un-hiden'); 
        document.removeEventListener('keydown', this._handleCloseByEscKey); 
    }
    _handleCloseByEscKey = (evt) => { //для закрытия с помощью кнопки esc
        if (evt.key === 'Escape') {
          this.closePopup(this._openedPopup);
        }
      };
    setEventListeners(){
        this._popupList.forEach((popup) => {
            popup.addEventListener('click', (e) => {
              if (e.target.classList.contains('pop-up__close-button-img') || e.target.classList.contains('pop-up_un-hiden')) { 
                this.closePopup()
              }
            })
          })
            
    }
}

export class PopupWithImage extends Popup{
  constructor(popup,name,link) {
    super(popup)
     this._name = name;
     this._link = link;
 }

openPopup() {
  popBigImage.src = this._link;
  popText.textContent = this._name;
  popBigImage.alt = this._name;
  this._popup.classList.add('pop-up_un-hiden');
  document.addEventListener('keydown', this._handleCloseByEscKey);
}

}



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


// //для создания блока
// function addSaveForm(evt) {
//   evt.preventDefault();
//   const elem = new Card(placeInput.value, sourceInput.value);
//   section.renderer(elem)
//   placeInput.value = ""; //эти две строчки,чтобы обнулить поля,после ввода
//   sourceInput.value = "";
//   popupTypeAdd.closePopup();
// }

// function openPopForEditButton(){
//     popupTypeEdit.openPopup();
//     userInfo.getUserInfo();
//     //disableSubmitButton(saveButtonEdit,ValidationData);
// }

// function openPopForAddButton(){
//   validateFormProfile.disableSubmitButton();
//   popupTypeAdd.openPopup();
// }

// function editSaveForm(evt) {
//     evt.preventDefault();                           
//     userInfo.setUserInfo();
//     popupTypeEdit.closePopup();
// }

