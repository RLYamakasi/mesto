const main = document.querySelector('#main');
const popUpEdit = document.querySelector('.pop-up_type_edit');
const popUpEditButton = main.querySelector('.profile__button');
const popUpAddButton = document.querySelector('.profile__add-button');
const popUpAdd = document.querySelector('.pop-up_type_add');
const formEdit = document.querySelector('#edit');
const formAdd = document.querySelector('#add');
const nameInput = document.querySelector('#name'); 
const jobInput = document.querySelector('#job');
const placeInput = document.querySelector('#place'); 
const sourceInput = document.querySelector('#source');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const image = document.querySelectorAll('.element__image');
const popUpImage = document.querySelector('.pop-up_type_image');
const popBigImage = document.querySelector('.pop-up__bigImage');
const popText = document.querySelector('.pop-up__text');
const saveButtonEdit = popUpEdit.querySelector('.form__save-button');
const saveButtonAdd = popUpAdd.querySelector('.form__save-button');

const сlosePopupByKey = (evt) => { //для закрытия с помощью кнопки esc
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.pop-up_unHiden');
    closePopup(openedPopup);
  }
};

export const deleteBlock = (event) => { 
  event.target.closest(".element").remove(); 
}

export const setLike = (event) => { 
  event.target.classList.toggle('element__button_active');
}

export const openImage = (name, link) => {
  popBigImage.src = link;
  popText.textContent = name;
  popBigImage.alt = name;
  openPopup(popUpImage)
}

//чтобы при открытии pop-up, выставлялось имя
function setNameAndJob(name, job){   
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

//тоже самое, только при сохранении и работает немного иначе
function reveseSetNameAndJob(name, job){
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}

function openPopup(popup) {
  popup.classList.add('pop-up_unHiden');
  document.addEventListener('keydown', сlosePopupByKey);
}

function closePopup(popup) {
  popup.classList.remove('pop-up_unHiden');
  document.removeEventListener('keydown', сlosePopupByKey);
}


//для создания блока
function formAddSave(evt) {
  evt.preventDefault();
  const elem = new Card(placeInput.value, sourceInput.value);
  const cardElem = elem.makeBlock();
  elements.prepend(cardElem);                   
  placeInput.value = ""; //эти две строчки,чтобы обнулить поля,после ввода
  sourceInput.value = "";
  closePopup(popUpAdd);
}


function popOpenForEditButton(){
    openPopup(popUpEdit);
    setNameAndJob(name, job);
    //disableSubmitButton(saveButtonEdit,ValidationData);
}

function popOpenForAddButton(){
    openPopup(popUpAdd);

}

function formEditSave(evt) {
    evt.preventDefault();                           
    reveseSetNameAndJob(name, job);
    closePopup(popUpEdit);
}

popUpAddButton.addEventListener("click", popOpenForAddButton);
popUpEditButton.addEventListener("click", popOpenForEditButton);
formAdd.addEventListener("submit", formAddSave); 
formEdit.addEventListener("submit", formEditSave);


main.querySelectorAll('.pop-up').forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('pop-up__closeButtonImg')) { 
      closePopup(popup)
    }
    if (e.target.classList.contains('pop-up_unHiden')) { 
      closePopup(popup);
    }
  })
})

 import{initialCards} from "./cards.js";
 import Card from "./cards.js";


//это для генерации начальных карточек
function startBlocks(){
  for(let i = 0; i < initialCards.length; i++){ 
    const elem = new Card(initialCards[i].name, initialCards[i].link);
    const cardElem = elem.makeBlock();
    elements.prepend(cardElem);
  }  
}

import FormValidator from "./validate.js"
import {ValidationData} from "./validate.js"

const validateFormProfile = new FormValidator(ValidationData, placeInput);
validateFormProfile.validation();
const validateFormCard = new FormValidator(ValidationData, sourceInput);
validateFormCard.validation();


startBlocks()