 import '../pages/index.css'; //для webpack

import {initialCards} from "./constants.js";
import Card from "./components/Card.js";
import Popup from "./components/Popup.js";
import FormValidator from "./components/FormValidator.js"
import {validationData} from "./constants.js"
import UserInfo from "./components/UserInfo.js";
import Section from "./components/Section.js";
import {PopupWithImage} from "./components/PopupWithImage.js";
import {PopupWithForm} from "./components/PopupWithForm.js";

const elements = document.querySelector('.elements');

export const popBigImage = document.querySelector('.pop-up__big-image');
export const popText = document.querySelector('.pop-up__text');
export const popUpImage = document.querySelector('.pop-up_type_image');
export const nameInput = document.querySelector('#name'); 
export const jobInput = document.querySelector('#job');
export const placeInput = document.querySelector('#place'); 
export const sourceInput = document.querySelector('#source');
export const popUpEdit = document.querySelector('.pop-up_type_edit');
export const popUpAdd = document.querySelector('.pop-up_type_add');


const popUpEditButton = document.querySelector('.profile__button');
const popUpAddButton = document.querySelector('.profile__add-button');
const formEdit = document.querySelector('#edit');
const formAdd = document.querySelector('#add');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const saveButtonEdit = popUpEdit.querySelector('.form__save-button');
const saveButtonAdd = popUpAdd.querySelector('.form__save-button');
const validateFormProfile = new FormValidator(validationData, formEdit);
validateFormProfile.enableValidation();
const validateFormCard = new FormValidator(validationData, formAdd);
const popupWithImage = new PopupWithImage(popUpImage,place,source); 
validateFormCard.enableValidation();
// const popupTypeEdit = new Popup(popUpEdit);
// popupTypeEdit.setEventListeners();
// const popupTypeAdd = new Popup(popUpAdd);
// popupTypeAdd.setEventListeners();
const userInfo = new UserInfo(name,job);
const section = new Section();
section.addItem()

const popupTypeAdd = new PopupWithForm(popUpAdd,saveButtonAdd);
const popupTypeEdit = new PopupWithForm(popUpEdit,saveButtonEdit);
popupTypeAdd.generate()
popupTypeEdit.generate()
// popupWithFormEdit._getInputValues()
// popupWithFormAdd._getInputValues()


popUpAddButton.addEventListener("click", openPopForAddButton);
popUpEditButton.addEventListener("click", openPopForEditButton);
formAdd.addEventListener("submit", addSaveForm); 
formEdit.addEventListener("submit", editSaveForm);


//для создания блока
function addSaveForm(evt) {
  evt.preventDefault();
  const cardElement = createCard(name,source); 
  section.renderer(cardElement)
  popupTypeAdd.closePopup();
}

function openPopForEditButton(){
    popupTypeEdit.openPopup();
    userInfo.getUserInfo();
    //disableSubmitButton(saveButtonEdit,ValidationData);
}

function openPopForAddButton(){
  validateFormProfile.disableSubmitButton();
  popupTypeAdd.openPopup();
}

function editSaveForm(evt) {
    evt.preventDefault();                           
    userInfo.setUserInfo();
    popupTypeEdit.closePopup();
}


function createCard(name,source) {
const card = new Card(name,source);
const cardElement = card.makeBlock();
return cardElement
}

// export function handleCardClick(name, link) {  ВЫВОДИТ ОШИБКУ this._handleCardClick not a function
//    popupWithImage.openPopup(name, link)
//   console.log(name,link)
// }


// export function makeImgForPopup(name, link) {
//  const popupTypeImage = new PopupWithImage(popUpImage,name, link);
//  return popupTypeImage;
// }
// console.log(makeImgForPopup())