import Popup from "../components/Popup.js";

export class PopupWithChangeAvatar extends Popup{
    constructor(popup,avatar,popConButton,patchProfile) {
      super(popup);
      this.patchProfile = patchProfile;
      this.popConButton = popConButton;
      this.avatar = avatar;
      this.formElement = popup.querySelector('.form__field');
      this._inputList = Array.from(
        this.formElement.querySelectorAll('.form__profile')
      );
   }

  


  patchAvatarToServer(){
    this.avatar.src = this.getAvatar()[0];
    // console.log(this.avatar)
    this.patchProfile()
  }

  getAvatar(){
    const formValues = {};
      this._inputList.forEach((item,index) =>{
        formValues[index] = item.value;
      });
      return formValues;

  }

  setAvatar(ava){
    this.avatar.src = ava;
  }

  setEventListeners(){
    super.setEventListeners()
    this.popConButton.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._element.remove()
    })  
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.patchAvatarToServer()
      this.closePopup()
    })
  } 
}