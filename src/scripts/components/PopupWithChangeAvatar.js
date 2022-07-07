import Popup from "../components/Popup.js";

export class PopupWithChangeAvatar extends Popup{
    constructor(popup,avatar,popConButton,patchAvatar) {
      super(popup);
      this.patchAvatar = patchAvatar;
      this.popConButton = popConButton;
      this.avatar = avatar;
      this.formElement = popup.querySelector('.form__field');
      this._inputList = Array.from(
        this.formElement.querySelectorAll('.form__profile')
      );
   }

  setAvatar(){
    this.getAvatar()
    this.avatar.src = this.getAvatar()[0];
    this.patchAvatar(this.avatar.src)
  }

  getAvatar(){
    const formValues = {};
      this._inputList.forEach((item,index) =>{
        formValues[index] = item.value;
      });
      console.log(formValues)
      return formValues;

  }


  setEventListeners(){
    super.setEventListeners()
    this.popConButton.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._element.remove()
    })  
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.setAvatar()
      this.closePopup()
    })
  } 
}