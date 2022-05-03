//Скрипт для открытия и закрытия pop-up
let main = document.querySelector('#main');
let popUpEdit = document.querySelector('#popEdit');
let popUpEditButton = main.querySelector('.profile__button');
let popUpAddButton = document.querySelector('.profile__add-button');
let popUpAdd = document.querySelector('#popAdd');
let formEdit = document.querySelector('#edit');
let formAdd = document.querySelector('#add');
let nameInput = document.querySelector('#name'); 
let jobInput = document.querySelector('#job');
let placeInput = document.querySelector('#place'); 
let sourceInput = document.querySelector('#source');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');
let blockTemplate = document.querySelector('#blockTemplate').content;
let imageTemplate = document.querySelector('#imageTemplate').content;
let elements = document.querySelector('.elements');
let image = document.querySelectorAll('.element__image');
let closeButton = document.querySelectorAll('.pop-up__closeButton');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

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

let popUpClosing = (event) =>{
  event.target.closest('.pop-up').classList.toggle('pop-up_unHiden');
  console.log("gfgd");
}

let setLike = (event) => {
  event.target.closest('.element__button').classList.toggle('.element__button_active');
}

let deleteBlock = (event) => {
  event.target.closest(".element").remove();
}

//добавление блока
function addBlock(text, source){
    let element = blockTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = source.value;
    element.querySelector('.element__text').textContent = text.value;
    elements.prepend(element);
    let bin = document.querySelector('.element__bin');
    let likes = main.querySelector('.element__button');
    likes.addEventListener("click", setLike);
    bin.addEventListener("click", deleteBlock);
}

function popOpenForEditButton(){
    popUpEdit.classList.add('pop-up_unHiden');
    setNameAndJob(name, job);
}

function popOpenForAddButton(){
    popUpAdd.classList.add('pop-up_unHiden');
}

function formEditSave(evt) {
    evt.preventDefault();                           
    reveseSetNameAndJob(name, job);
    popUpClosing();
}

function formAddSave(evt) {
    evt.preventDefault();                           
    addBlock(placeInput, sourceInput);
    placeInput.value = "";
    sourceInput.value = "";
    popUpClosing();
}

popUpAddButton.addEventListener("click", popOpenForAddButton);
popUpEditButton.addEventListener("click", popOpenForEditButton);
formAdd.addEventListener("submit", formAddSave); 
formEdit.addEventListener("submit", formEditSave); 

image.forEach(function (el){
  function openImage(){
    let cloneOfImage = el.src;
    let element = imageTemplate.querySelector('.pop-up_type_image').cloneNode(true);
    element.querySelector('.pop-up__bigImage').src = cloneOfImage;
    elements.after(element);
    element.classList.add('pop-up_unHiden');
    let closeButton = document.querySelector('.pop-up__closeButton');
    closeButton.addEventListener("click", popUpClosing)
  }
  el.addEventListener("click", openImage);
  
});

//для элементов,которые уже есть на странице
main.querySelectorAll('.element__button')
  .forEach(el => el.addEventListener('click', () => el.classList.toggle('element__button_active')));

main.querySelectorAll('.element__bin')
  .forEach(el => el.addEventListener('click', deleteBlock));

  //для закрытия pop-up, работает на честном слове
main.querySelectorAll('.pop-up__closeButton')
  .forEach(el => el.addEventListener('click', popUpClosing));
