import Popup from "../components/Popup.js";

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