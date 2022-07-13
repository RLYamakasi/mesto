import Popup from "../components/Popup.js";


export class PopupWithConfirm extends Popup{
    constructor(popup) {
      super(popup);
      this._popConButton = popup.querySelector('.pop-up__save-button');
      this._buttonText = "Да";
   }

  setEventListeners(){
    super.setEventListeners()
  }
  loadUX(){
    this._popConButton.textContent = "Подождите...."
  }
  returnUX(){
    this._popConButton.textContent = this._buttonText
  }
    
}