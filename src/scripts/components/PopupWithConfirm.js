import Popup from "../components/Popup.js";


export class PopupWithConfirm extends Popup{
    constructor(popup,callback) {
      super(popup);
      this.popConButton = popup.querySelector('.pop-up__save-button');
   }

  setEventListeners(){
    super.setEventListeners()
    this.popConButton.addEventListener('click', this.confirmDelete); 
  }

  confirmDelete(){
    this.openPopup()
  }
    
}