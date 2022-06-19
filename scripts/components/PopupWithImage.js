import Popup from "../components/Popup.js";
import {popBigImage,popText} from "../script.js"



export class PopupWithImage extends Popup{
    constructor(popup) {
      super(popup)

   }
  
  openPopup(name,link) {
    super.openPopup()
    popBigImage.src = link;
    popText.textContent = name;
    popBigImage.alt = name;
  }
  }