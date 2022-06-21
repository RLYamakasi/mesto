import Popup from "../components/Popup.js";

export class PopupWithForm extends Popup{
    constructor(popup,subFunc) {
      super(popup);
      this._subFunc = subFunc;
      this._popUpAdd = document.querySelector('.pop-up_type_add');
      this._selector = popup;
      this.formElement = this._selector.querySelector('.form__field');
      this._inputList = Array.from(
        this.formElement.querySelectorAll('.form__profile')
      );
    }
  
    _setEventListeners() {
      super.setEventListeners()
      this.formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._subFunc()
        this.getInputValues();
      })
    }
  
    getInputValues() {
      const formValues = {};
      this._inputList.forEach((item,index) =>{
        formValues[index] = item.value;
      });
      return formValues;
    }
  
    generate() {
      this._setEventListeners();
      return this.formElement;
    }
    
closePopup(){ 
  if (this.selector = this._popUpAdd){
    super.closePopup();
    this.formElement.reset()
  }
  else{
    super.closePopup();
  }  
} 
  }

  
