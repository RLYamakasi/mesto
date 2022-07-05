import '../pages/index.css'; //для webpack

import {initialCards} from "./constants.js";
import Card from "./components/Card.js";
import Popup from "./components/Popup.js";
import FormValidator from "./components/FormValidator.js"
import {validationData} from "./constants.js"
import UserInfo from "./components/UserInfo.js";
import Section from "./components/Section.js";
import {PopupWithChangeAvatar} from "./components/PopupWithChangeAvatar.js";
import {PopupWithImage} from "./components/PopupWithImage.js";
import {PopupWithForm} from "./components/PopupWithForm.js";
import {PopupWithConfirm} from "./components/PopupWithConfirm.js";
import Api from "./components/Api.js"

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
const popUpCon = document.querySelector('.pop-up_type_confirm');
const popUpChange = document.querySelector('.pop-up_type_updateAvatar');
const popConButton = popUpCon.querySelector('.pop-up__save-button');
const popUpEditButton = document.querySelector('.profile__button');
const popUpAddButton = document.querySelector('.profile__add-button');
const formEdit = document.querySelector('#edit');
const formAdd = document.querySelector('#add');
const formAvatar = document.querySelector('#avatar');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const avatar = document.querySelector('.profile__avatar'); 
const saveButtonEdit = popUpEdit.querySelector('.form__save-button');
const saveButtonAdd = popUpAdd.querySelector('.form__save-button');
const validateFormProfile = new FormValidator(validationData, formEdit);
const validateFormCard = new FormValidator(validationData, formAdd);
const validateFormAvatar = new FormValidator(validationData, formAvatar);
const popupWithImage = new PopupWithImage(popUpImage,popBigImage,popText);
popupWithImage.setEventListeners();
validateFormCard.enableValidation();
validateFormProfile.enableValidation();
validateFormAvatar.enableValidation();

const userInfo = new UserInfo(name,job);
const popupTypeChange = new PopupWithChangeAvatar(popUpChange,avatar);
const popupTypeCon = new PopupWithConfirm(popUpCon);
const popupTypeAdd = new PopupWithForm(popUpAdd,addSaveForm);
const popupTypeEdit = new PopupWithForm(popUpEdit,editSaveForm);
popupTypeChange.setEventListeners()
popupTypeCon.setEventListeners()
popupTypeAdd.generate()
popupTypeEdit.generate()


popUpAddButton.addEventListener("click", openPopForAddButton);
popUpEditButton.addEventListener("click", openPopForEditButton);
avatar.addEventListener("click", openPopupChange)


//для создания блока
function addSaveForm() {
  PostToServerCards(submitHandler(popupTypeAdd)[0],submitHandler(popupTypeAdd)[1])
  renderer(submitHandler(popupTypeAdd)[0],submitHandler(popupTypeAdd)[1],0)
  popupTypeAdd.closePopup();
}

function openPopForEditButton(){
  openPop(popupTypeEdit); 
  const data = userInfo.getUserInfo();
  nameInput.value = data[0]; 
  jobInput.value = data[1]; 

}

function openPopForAddButton(){
  validateFormCard.disableSubmitButton();
  openPop(popupTypeAdd);
}

function editSaveForm() {   
  userInfo.setUserInfo(submitHandler(popupTypeEdit))
  patchProfile()
  popupTypeEdit.closePopup();
}


function submitHandler(popup){
  const values = popup.getInputValues()
  // patchProfile(values)
  return values
}

function patchProfile(){
  const values = submitHandler(popupTypeEdit);
  const name = values[0];
  const about = values[1];
  console.log(avatar.src)
  api.patchProfile(name,about,avatar.src)
  .then(res => res.json())
  .then((result) => {
    console.log(result);
   });
}



function createCard(name,source,likes,ownerId,Id) {
const card = new Card(name,source,likes,ownerId,Id,handleCardClick,openPopCon,popConButton,deleteCardFromServer);
const cardElement = card.makeBlock();
return cardElement
}

function handleCardClick(name,link) {
  popupWithImage.openPopup(name, link)
 }


 function renderer(name,source,likes,ownerId,Id){ 
  const cardElement = createCard(name,source,likes,ownerId,Id);
  elements.prepend(cardElement);
 }

 const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: 'f8ed7ea7-e8eb-44c1-9707-d548331f0bfb',
    'Content-Type': 'application/json'
  }
}); 


function getServerCards(){
  api.getInitialCards()
  .then(res => res.json())
   .then((result) => {
    console.log(result)
    renderServerCards(result)
     }); 
}

function deleteCardFromServer(id){
  api.deleteCard(id)
  .then(res => res.json())
   .then((result) => {
    console.log(result)
    // renderServerCards(result)
     }); 
}



function setUserdata(){
  api.getProfile()
  .then(res => res.json())
   .then((result) => {
    const res = [result.name , result.about]
    userInfo.setUserInfo(res)

     }); 
}

function PostToServerCards(name,link){
  api.postCards(name,link)
  .then(res => res.json())
  .then((result) => {
    console.log(result)
     }); 
}

function renderServerCards(result){
  const section = new Section(result,renderer);
  section.addItem()
 }


function openPopCon(){
  popupTypeCon.openPopup()
}

function openPopupChange(){
  popupTypeChange.openPopup()
}

function openPop(pop){
  pop.openPopup()
}



getServerCards()
setUserdata()

    