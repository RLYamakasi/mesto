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
import {PopupWithConfirm} from "./components/PopupWithConfirm.js";
import Api from "./components/Api.js"

const cardsContainer = document.querySelector('.elements'); 
const popBigImage = document.querySelector('.pop-up__big-image');
const popText = document.querySelector('.pop-up__text');
const popUpImage = document.querySelector('.pop-up_type_image');
const nameInput = document.querySelector('#name'); 
const jobInput = document.querySelector('#job');
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
const avatar = document.querySelector('.profile__avatar-img'); 
const saveButtonEdit = popUpEdit.querySelector('.form__save-button');
const saveButtonAdd = popUpAdd.querySelector('.form__save-button');
// const section = new Section(cardsContainer,renderer);
const validateFormProfile = new FormValidator(validationData, formEdit);
const validateFormCard = new FormValidator(validationData, formAdd);
const validateFormAvatar = new FormValidator(validationData, formAvatar);
const popupWithImage = new PopupWithImage(popUpImage,popBigImage,popText);
popupWithImage.setEventListeners();
validateFormCard.enableValidation();
validateFormProfile.enableValidation();
validateFormAvatar.enableValidation();

const userInfo = new UserInfo(object);
const popupTypeChange = new PopupWithForm(popUpChange,patchAvatar);
const popupTypeCon = new PopupWithConfirm(popUpConfirm);
const popupTypeAdd = new PopupWithForm(popUpAdd,addSaveForm);
const popupTypeEdit = new PopupWithForm(popUpEdit,patchProfile);
popupTypeEdit.setEventListeners()
popupTypeChange.setEventListeners()
popupTypeCon.setEventListeners()
popupTypeAdd.setEventListeners()


popUpAddButton.addEventListener("click", openPopForAddButton);
popUpEditButton.addEventListener("click", openPopForEditButton);
avatar.addEventListener("click", openPopForChangeAvatar)


//для создания блока
function addSaveForm() {
  postCardsToEverywhere(submitHandler(popupTypeAdd).name,submitHandler(popupTypeAdd).about);
  formAdd.reset()
  // renderer(submitHandler(popupTypeAdd).name,submitHandler(popupTypeAdd).about,0,userInfo.userId)
}

function openPopForEditButton(){
  validateFormProfile.disableSubmitButton();
  popupTypeEdit.openPopup(); 
  const data = userInfo.getUserInfo();
  // console.log(data)
  nameInput.value = data.name; 
  jobInput.value = data.job; 

}

function openPopForAddButton(){
  validateFormCard.disableSubmitButton();
  popupTypeAdd.openPopup();
}

function listenerForDeleteButton(id,deleteCard){
  popupTypeCon.openPopup()
  popConButton.addEventListener("click",()=> 
  deleteCardFromEverywhere(id,deleteCard));
}

function submitHandler(popup){
  const values = popup.getInputValues()
  const valueConvert = {name:values[0],about:values[1]}
  return valueConvert;
}


function createCard(name,source,likes,ownerId,Id) {
  const myid = userInfo.userId;
  const card = new Card(name,source,likes,ownerId,Id,handleCardClick,setLike,deleteLike,myid,listenerForDeleteButton);
  const cardElement = card.makeBlock();
  return cardElement
}

function handleCardClick(name,link) {
  popupWithImage.openPopup(name, link)
 }




 function renderer(name,source,likes,ownerId,Id){
  const cardElement = createCard(name,source,likes,ownerId,Id);
  section.addItem(cardElement)

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
  api.getProfile(), 
  api.getInitialCards()
])
  .then(([infoResult, cardsResult])=>{
    console.log(infoResult)
    cardsResult.reverse()
    userInfo.setAvatar(infoResult.avatar)
    userInfo.getUserId(infoResult._id)
    const section = new Section(cardsResult,renderer); 
    section.renderItems()
    userInfo.setUserInfo(infoResult)
  }) 
}

function deleteCardFromEverywhere(id,deleteCard){
  popupTypeCon.loadUX()
  api.deleteCard(id)
   .then((result) => {
    deleteCard()
    popupTypeCon.closePopup()
    console.log(result)
  })
  .catch((err) => {
   console.log(err);
 }).finally(()=> {
  popupTypeCon.returnUX()
  
}) 
}


function setLike(id,setLike){ 
  api.setLike(id) 
  .then((result) => {
    console.log(result); 
   })
  .catch((err) => {
   console.log(err);
 })
 .finally(()=> {
  setLike()
}) 
}



function deleteLike(id,deleteLike){ 
  api.deleteLike(id) 
  .then((result) => {
    console.log(result); 
   })
  .catch((err) => {
   console.log(err);
 })
 .finally(()=> {
  deleteLike()
})
}


function patchProfile(){
  const values = submitHandler(popupTypeEdit)
  const name = values.name; 
  const about = values.about;  
  popupTypeEdit.loadUX()
  api.patchProfile(name,about) 
  .then((result) => {
    userInfo.setUserInfo(submitHandler(popupTypeEdit))
    popupTypeEdit.closePopup()
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
  const avatar = popupTypeChange.getInputValues()
  popupTypeChange.loadUX()
  api.patchAvatar(avatar[0]) 
  .then((result) => {
    userInfo.setAvatar(avatar[0])
    console.log(result); 
    popupTypeChange.closePopup()
   })
  .catch((err) => {
   console.log(err);
 })
 .finally(()=> {
  popupTypeChange.returnUX()
}) 
}



function postCardsToEverywhere(name,link){
  popupTypeAdd.loadUX()
  api.postCards(name,link)
  .then((result) => {
    renderer(name,link,[],userInfo.userId,result._id)
    popupTypeAdd.closePopup(); 
  })
  .catch((err) => {
   console.log(err);
 })
 .finally(()=> {

  popupTypeAdd.returnUX()
})  
}


// function renderServerCards(result){
  
//  }



function openPopForChangeAvatar(){
  popupTypeChange.openPopup()
}



getServerCards()

