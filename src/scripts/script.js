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
const object = {name:name, job:job}
const avatar = document.querySelector('.profile__avatar_img'); 
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

const userInfo = new UserInfo(object);
const popupTypeChange = new PopupWithChangeAvatar(popUpChange,avatar,popConButton,patchAvatar);
const popupTypeCon = new PopupWithConfirm(popUpConfirm);
const popupTypeAdd = new PopupWithForm(popUpAdd,addSaveForm);
const popupTypeEdit = new PopupWithForm(popUpEdit,editSaveForm);
popupTypeEdit.setEventListeners()
popupTypeChange.setEventListeners()
popupTypeCon.setEventListeners()
popupTypeAdd.setEventListeners()


popUpAddButton.addEventListener("click", openPopForAddButton);
popUpEditButton.addEventListener("click", openPopForEditButton);
avatar.addEventListener("click", openPopForChangeAvatar)


//для создания блока
function addSaveForm() {
  postCardsToEverywhere(submitHandler(popupTypeAdd).name,submitHandler(popupTypeAdd).about)
  // renderer(submitHandler(popupTypeAdd).name,submitHandler(popupTypeAdd).about,0,userInfo.userId)
  popupTypeAdd.closePopup();
}

function openPopForEditButton(){
  validateFormProfile.disableSubmitButton();
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

function listener(id,deleteCard){
  popupTypeCon.openPopup()
  popConButton.addEventListener("click",()=> 
  deleteCardFromEverywhere(id,deleteCard));
  popConButton.removeEventListener("click",()=> 
    deleteCardFromEverywhere(id,deleteCard));
}

function submitHandler(popup){
  const values = popup._getInputValues()
  const ValueConvert = {name:values[0],about:values[1]}
  return ValueConvert;
}


function createCard(name,source,likes,ownerId,Id) {
  const myid = userInfo.userId;
  const card = new Card(name,source,likes,ownerId,Id,handleCardClick,setLike,deleteLike,myid,listener);
  const cardElement = card.makeBlock();
  return cardElement
}

function handleCardClick(name,link) {
  popupWithImage.openPopup(name, link)
 }




 function renderer(name,source,likes,ownerId,Id){
  const cardElement = createCard(name,source,likes,ownerId,Id);
  section.renderItems(cardElement)
  // cardsContainer.prepend(cardElement);
 }

 const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: '6976fede-faeb-4a9a-8092-6b8fce19d4dd',
    'Content-Type': 'application/json'
  }
}); 




function getServerCards(){
  Promise.all([                 
  api.getProfile().then(response => response.json()), 
  api.getInitialCards().then(response => response.json())
])
  .then(([infoResult, cardsResult])=>{
    console.log(cardsResult)
    popupTypeChange.setAvatar(infoResult.avatar)
    userInfo.getUserId(infoResult._id) 
    renderServerCards(cardsResult)
    userInfo.setUserInfo(infoResult)
  }) 
}

function deleteCardFromEverywhere(id,deleteCard){
  popupTypeCon.loadUX()
  api.deleteCard(id)
  .then(res => {
    if(res.ok){
      deleteCard()
      return res.json()
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
   .then((result) => {
    console.log(result)
  })
  .catch((err) => {
   console.log(err);
 }).finally(()=> {
  popupTypeCon.returnUX()
  popupTypeCon.closePopup()
}) 
 
}



function setLike(id,button){ 
  api.setLike(id) 
  .then(res => res.json()) 
  .then((result) => {
    console.log(result); 
   })
  .catch((err) => {
   console.log(err);
 })
 .finally(()=> {
  button.querySelector('.element__button').classList.add('element__button_active');
  button.querySelector('.element__like-count').innerText ++;
}) 
}



function deleteLike(id,button){ 
  api.setLike(id) 
  .then(res => res.json()) 
  .then((result) => {
    console.log(result); 
   })
  .catch((err) => {
   console.log(err);
 })
 .finally(()=> {
  console.log(button);
  button.querySelector('.element__button').classList.remove('element__button_active');
  button.querySelector('.element__like-count').innerText --;
})
}


function patchProfile(){
  const values = userInfo.getUserInfo()
  // const values = submitHandler(popupTypeEdit);
  const name = values.name; 
  const job = values.job;  
  const avatar = popupTypeChange.getAvatar()
  popupTypeEdit.loadUX()
  api.patchProfile(name,job,avatar[0]) 
  .then(res => res.json()) 
  .then((result) => {
    console.log(result); 
   })
  .catch((err) => {
   console.log(err);
 })
 .finally(()=> {
  popupTypeEdit.returnUX()
}) 
}


function patchAvatar(){
  const avatar = popupTypeChange.getAvatar()
  popupTypeEdit.loadUX()
  api.patchAvatar(avatar[0]) 
  .then(res => res.json()) 
  .then((result) => {
    console.log(result); 
   })
  .catch((err) => {
   console.log(err);
 })
 .finally(()=> {
  popupTypeEdit.returnUX()
}) 
}



function postCardsToEverywhere(name,link){
  popupTypeAdd.loadUX()
  api.postCards(name,link)
  .then(res => res.json())
  .then((result) => {
    renderer(name,link,[],userInfo.userId,result._id)
  })
  .catch((err) => {
   console.log(err);
 })
 .finally(()=> {
  popupTypeEdit.returnUX()
})  
}


function renderServerCards(result){
  const section = new Section(result,renderer); 
  section.addItem()
 }



function openPopForChangeAvatar(){
  popupTypeChange.openPopup()
}



getServerCards()

