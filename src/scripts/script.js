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

const cardsContainer = document.querySelector('.elements'); 
const popBigImage = document.querySelector('.pop-up__big-image');
const popText = document.querySelector('.pop-up__text');
const popUpImage = document.querySelector('.pop-up_type_image');
const nameInput = document.querySelector('#name'); 
const jobInput = document.querySelector('#job');
const placeInput = document.querySelector('#place'); 
const sourceInput = document.querySelector('#source');
const popUpEdit = document.querySelector('.pop-up_type_edit');
const popUpAdd = document.querySelector('.pop-up_type_add');
const popUpConfirm = document.querySelector('.pop-up_type_confirm');
const popUpChange = document.querySelector('.pop-up_type_updateAvatar');
const popConButton = popUpConfirm.querySelector('.pop-up__save-button');
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
const section = new Section(cardsContainer,renderer);
const validateFormProfile = new FormValidator(validationData, formEdit);
const validateFormCard = new FormValidator(validationData, formAdd);
const validateFormAvatar = new FormValidator(validationData, formAvatar);
const popupWithImage = new PopupWithImage(popUpImage,popBigImage,popText);
popupWithImage.setEventListeners();
validateFormCard.enableValidation();
validateFormProfile.enableValidation();
validateFormAvatar.enableValidation();

const userInfo = new UserInfo(name,job);
const popupTypeChange = new PopupWithChangeAvatar(popUpChange,avatar,popConButton,patchAvatar);
const popupTypeCon = new PopupWithConfirm(popUpConfirm);
const popupTypeAdd = new PopupWithForm(popUpAdd,addSaveForm);
const popupTypeEdit = new PopupWithForm(popUpEdit,editSaveForm);
popupTypeEdit.setEventListeners()
popupTypeChange.setEventListeners()
popupTypeCon.setEventListeners()
popupTypeAdd.generate()
popupTypeEdit.generate()


popUpAddButton.addEventListener("click", openPopForAddButton);
popUpEditButton.addEventListener("click", openPopForEditButton);
avatar.addEventListener("click", openPopForChangeAvatar)


//для создания блока
function addSaveForm() {
  postToServerCards(submitHandler(popupTypeAdd).name,submitHandler(popupTypeAdd).about)
  renderer(submitHandler(popupTypeAdd).name,submitHandler(popupTypeAdd).about)
  popupTypeAdd.closePopup();
}

function openPopForEditButton(){
  popupTypeEdit.openPopup(); 
  const data = userInfo.getUserInfo();
  console.log(data)
  nameInput.value = data.name; 
  jobInput.value = data.job; 

}

function openPopForAddButton(){
  validateFormCard.disableSubmitButton();
  popupTypeAdd.openPopup();
}

function editSaveForm() { 
  userInfo.setUserInfo(submitHandler(popupTypeEdit))
  patchProfile()
  popupTypeEdit.closePopup();
}


function submitHandler(popup){
  let values = popup.getInputValues()
  console.log(values)
  return values;
}


function createCard(name,source,likes,ownerId,Id) {
  const card = new Card(name,source,likes,ownerId,Id,handleCardClick,openPopCon,deleteCardFromServer,setLike);
  const cardElement = card.makeBlock();
  return cardElement
}

function handleCardClick(name,link) {
  popupWithImage.openPopup(name, link)
 }


 function renderer(name,source,likes,ownerId,Id){
  const cardElement = createCard(name,source,likes,ownerId,Id);
  cardsContainer.prepend(cardElement);
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
  .then(res => {
    if(res.ok){
      return res.json()
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
   .then((res) => {
    console.log(res)
    return renderServerCards(res)
     })
     .catch((err) => {
      console.log(err);
    }); 
}

function deleteCardFromServer(id){
  api.deleteCard(id)
  .then(res => {
    if(res.ok){
      return res.json()
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
   .then((result) => {
    console.log(result)
    // renderServerCards(result)

  })
  .catch((err) => {
   console.log(err);
 }); 
}



//Я потратил кучу часов,чтобы получить id и отправить его в класс card,я уже просто не знаю что делать и как исправлять другие ошибки
function setUserdata(){
  api.getProfile()
  .then(res => {
    if(res.ok){
      return res.json()
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
   .then((res) => {
    console.log(res)
    userInfo.setUserInfo(res)
    return res._id
     })
     .catch((err) => {
      console.log(err);
    }); 
}



function setLike(id){ 
  api.setLike(id) 
  .then(res => res.json()) 
  .then((result) => { 
    console.log(result); 
   })
  .catch((err) => {
   console.log(err);
 }); 
}


function patchProfile(){
  const values = submitHandler(popupTypeEdit);
  const name = values.name; 
  const about = values.about;
  api.patchProfile(name,about) 
  .then(res => res.json()) 
  .then((result) => { 
    console.log(result); 
   })
  .catch((err) => {
   console.log(err);
 }); 
}


function patchAvatar(avatar){
  api.patchAvatar(avatar)
  .then(res => res.json()) 
  .then((result) => { 
    console.log(result); 
   })
  .catch((err) => {
   console.log(err);
 }); 
}


function postToServerCards(name,link){
  api.postCards(name,link)
  .then(res => res.json())
  .then((result) => {
    console.log(result)
  })
  .catch((err) => {
   console.log(err);
 }); 
}


function renderServerCards(result){
  const section = new Section(result,renderer); 
  section.addItem()
 }


function openPopCon(){
  popupTypeCon.openPopup()
}

function openPopForChangeAvatar(){
  popupTypeChange.openPopup()
}



getServerCards()
setUserdata()
