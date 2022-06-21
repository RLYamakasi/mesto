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

const popBigImage = document.querySelector('.pop-up__big-image');
const popText = document.querySelector('.pop-up__text');
const popUpImage = document.querySelector('.pop-up_type_image');
const nameInput = document.querySelector('#name'); 
const jobInput = document.querySelector('#job');
const placeInput = document.querySelector('#place'); 
const sourceInput = document.querySelector('#source');
const popUpEdit = document.querySelector('.pop-up_type_edit');
const popUpAdd = document.querySelector('.pop-up_type_add');
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
const popupWithImage = new PopupWithImage(popUpImage,popBigImage,popText);
validateFormCard.enableValidation();

const userInfo = new UserInfo(name,job);
const section = new Section(initialCards,renderer);
section.addItem()

const popupTypeAdd = new PopupWithForm(popUpAdd,addSaveForm);
const popupTypeEdit = new PopupWithForm(popUpEdit,editSaveForm);
popupTypeAdd.generate()
popupTypeEdit.generate()

popUpAddButton.addEventListener("click", openPopForAddButton);
popUpEditButton.addEventListener("click", openPopForEditButton);

//для создания блока
function addSaveForm() {
  // const cardElement = createCard(submitHandler(popupTypeAdd)[0],submitHandler(popupTypeAdd)[1]);
  section.renderer(submitHandler(popupTypeAdd)[0],submitHandler(popupTypeAdd)[1])
  popupTypeAdd.closePopup();
}

function openPopForEditButton(){
  popupTypeEdit.openPopup(); 
  const data = userInfo.getUserInfo();
  nameInput.value = data[0]; 
  jobInput.value = data[1]; 

}

function openPopForAddButton(){
  validateFormCard.disableSubmitButton();
  popupTypeAdd.openPopup();
}

function editSaveForm() {                           
    userInfo.setUserInfo(submitHandler(popupTypeEdit))
    popupTypeEdit.closePopup();
}

function submitHandler(popup){
  const values = popup.getInputValues()
  return values
  
}

function createCard(name,source) {
const card = new Card(name,source,handleCardClick);
const cardElement = card.makeBlock();
return cardElement
}

function handleCardClick(name,link) {
  popupWithImage.openPopup(name, link)
 }


 function renderer(name,source){ 
  const cardElement = createCard(name,source);
  elements.prepend(cardElement);
 }

