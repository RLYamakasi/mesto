import Popup from "../components/Popup.js";

export class PopupWithImage extends Popup{
    constructor(popup) {
      super(popup)
      this.popBigImage = document.querySelector('.pop-up__big-image');
      this.popText = document.querySelector('.pop-up__text');
   }
  
  openPopup(name,link) {
    super.openPopup()
    this.popBigImage.src = link;
    this.popText .textContent = name;
    this.popBigImage.alt = name;
  }
    
}