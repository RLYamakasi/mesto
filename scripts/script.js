import '../pages/index.css'; //для webpack

import {initialCards} from "./constants.js";
import Card from "./Card.js";
import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js"
import {validationData} from "./constants.js"
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import {PopupWithForm} from "./Popup.js";

const elements = document.querySelector('.elements');

export const popBigImage = document.querySelector('.pop-up__big-image');
export const popText = document.querySelector('.pop-up__text');
export const popUpImage = document.querySelector('.pop-up_type_image');
export const nameInput = document.querySelector('#name'); 
export const jobInput = document.querySelector('#job');
export const placeInput = document.querySelector('#place'); 
export const sourceInput = document.querySelector('#source');

const popUpEdit = document.querySelector('.pop-up_type_edit');
const popUpEditButton = document.querySelector('.profile__button');
const popUpAddButton = document.querySelector('.profile__add-button');
const popUpAdd = document.querySelector('.pop-up_type_add');
const formEdit = document.querySelector('#edit');
const formAdd = document.querySelector('#add');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const saveButtonEdit = popUpEdit.querySelector('.form__save-button');
const saveButtonAdd = popUpAdd.querySelector('.form__save-button');
const validateFormProfile = new FormValidator(validationData, formEdit);
validateFormProfile.enableValidation();
const validateFormCard = new FormValidator(validationData, formAdd);
validateFormCard.enableValidation();
const popupTypeEdit = new Popup(popUpEdit);
popupTypeEdit.setEventListeners();
const popupTypeAdd = new Popup(popUpAdd);
popupTypeAdd.setEventListeners();
const userInfo = new UserInfo(name,job);
const section = new Section();
section.addItem()
const FormAdd = new PopupWithForm(popUpAdd,saveButtonAdd);
const FormEdit = new PopupWithForm(popUpEdit,saveButtonEdit);



popUpAddButton.addEventListener("click", openPopForAddButton);
popUpEditButton.addEventListener("click", openPopForEditButton);
formAdd.addEventListener("submit", addSaveForm); 
formEdit.addEventListener("submit", editSaveForm);

//для создания блока
function addSaveForm(evt) {
  evt.preventDefault();
  const card = new Card(placeInput.value, sourceInput.value);  
  const cardElement = card.makeBlock(); 
  section.renderer(cardElement)
  placeInput.value = ""; //эти две строчки,чтобы обнулить поля,после ввода
  sourceInput.value = "";
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