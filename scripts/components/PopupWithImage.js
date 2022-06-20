import Popup from "../components/Popup.js";

export class PopupWithImage extends Popup{
    constructor(popup,popBigImage,popText) {
      super(popup)
      this.popBigImage - popBigImage;
      this.popText = popText;

   }
  
  openPopup(name,link) {
    super.openPopup()
    this.popBigImage.src = link;
    this.popText .textContent = name;
    this.popBigImage.alt = name;
  }
  }