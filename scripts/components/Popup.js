export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._openedPopup = document.querySelector('.pop-up_un-hiden');
        this._popupList = document.querySelectorAll('.pop-up');
    }
    openPopup() {
        this._popup.classList.add('pop-up_un-hiden');
        document.addEventListener('keydown', this._handleCloseByEscKey);
    }
    closePopup() { 
        this._popup.classList.remove('pop-up_un-hiden'); 
        document.removeEventListener('keydown', this._handleCloseByEscKey); 
    }
    _handleCloseByEscKey = (evt) => { //для закрытия с помощью кнопки esc
        if (evt.key === 'Escape') {
          this.closePopup(this._openedPopup);
        }
      };
    setEventListeners(){
        this._popupList.forEach((popup) => {
            popup.addEventListener('click', (e) => {
              if (e.target.classList.contains('pop-up__close-button-img') || e.target.classList.contains('pop-up_un-hiden')) { 
                this.closePopup()
              }
            })
          })
            
    }
}





// //для создания блока
// function addSaveForm(evt) {
//   evt.preventDefault();
//   const elem = new Card(placeInput.value, sourceInput.value);
//   section.renderer(elem)
//   placeInput.value = ""; //эти две строчки,чтобы обнулить поля,после ввода
//   sourceInput.value = "";
//   popupTypeAdd.closePopup();
// }

// function openPopForEditButton(){
//     popupTypeEdit.openPopup();
//     userInfo.getUserInfo();
//     //disableSubmitButton(saveButtonEdit,ValidationData);
// }

// function openPopForAddButton(){
//   validateFormProfile.disableSubmitButton();
//   popupTypeAdd.openPopup();
// }

// function editSaveForm(evt) {
//     evt.preventDefault();                           
//     userInfo.setUserInfo();
//     popupTypeEdit.closePopup();
// }

