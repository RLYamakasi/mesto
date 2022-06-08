import {initialCards} from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js"
import {validationData} from "./constants.js"

const popUpEdit = document.querySelector('.pop-up_type_edit');
const popUpEditButton = document.querySelector('.profile__button');
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
const popUpImage = document.querySelector('.pop-up_type_image');
const popBigImage = document.querySelector('.pop-up__big-image');
const popText = document.querySelector('.pop-up__text');
const saveButtonEdit = popUpEdit.querySelector('.form__save-button');
const saveButtonAdd = popUpAdd.querySelector('.form__save-button');

const validateFormProfile = new FormValidator(validationData, formEdit);
validateFormProfile.enableValidation();
const validateFormCard = new FormValidator(validationData, formAdd);
validateFormCard.enableValidation();


const handleCloseByEscKey = (evt) => { //для закрытия с помощью кнопки esc
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.pop-up_un-hiden');
    closePopup(openedPopup);
  }
};

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
  popup.classList.add('pop-up_un-hiden');
  document.addEventListener('keydown', handleCloseByEscKey);
}

function closePopup(popup) {
  popup.classList.remove('pop-up_un-hiden');
  document.removeEventListener('keydown', handleCloseByEscKey);
}


//для создания блока
function addSaveForm(evt) {
  evt.preventDefault();
  renderCard(placeInput.value, sourceInput.value);   
  placeInput.value = ""; //эти две строчки,чтобы обнулить поля,после ввода
  sourceInput.value = "";
  closePopup(popUpAdd);
}


function openPopForEditButton(){
    openPopup(popUpEdit);
    setNameAndJob(name, job);
    //disableSubmitButton(saveButtonEdit,ValidationData);
}

function openPopForAddButton(){
  validateFormProfile.disableSubmitButton();
  openPopup(popUpAdd);
    
}

function editSaveForm(evt) {
    evt.preventDefault();                           
    reveseSetNameAndJob(name, job);
    closePopup(popUpEdit);
}

popUpAddButton.addEventListener("click", openPopForAddButton);
popUpEditButton.addEventListener("click", openPopForEditButton);
formAdd.addEventListener("submit", addSaveForm); 
formEdit.addEventListener("submit", editSaveForm);


document.querySelectorAll('.pop-up').forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('pop-up_close-button-img') || e.target.classList.contains('pop-up_un-hiden')) { 
      closePopup(popup)
    }
  })
})
  

//это для генерации начальных карточек
function renderStartBlocks() { 
  initialCards.forEach((elem) => { 
    renderCard(elem.name, elem.link); 
  }) 
} 

function createCard(name, link){
  const elem = new Card(name, link);  
  return elem.makeBlock(); 
}

function renderCard(name, link){
  const cardElement = createCard(name, link);
  elements.prepend(cardElement);
} 





renderStartBlocks()
