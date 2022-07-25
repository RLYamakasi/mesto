import Popup from "../components/Popup.js";

export class PopupWithForm extends Popup{
    constructor(popup,subFunc) {
      super(popup);
      this._subFunc = subFunc;
      this._popUpAdd = document.querySelector('.pop-up_type_add');
      this._popup = popup;
      this.formElement = this._popup.querySelector('.form__field');
      this._inputList = Array.from(
        this.formElement.querySelectorAll('.form__profile')
      );
    }
  
    setEventListeners() {
      super.setEventListeners()
      this.formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._subFunc()
        // super.closePopup();
      })
    }

    closePopup(){
      super.closePopup()
    }
  
    getInputValues() {
      const formValues = {};
      this._inputList.forEach((item,index) =>{
        formValues[index] = item.value;
      });
      return formValues;
    }

    

}

  
