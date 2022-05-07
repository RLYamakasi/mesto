const main = document.querySelector('#main');
const popUpEdit = document.querySelector('.pop-up_type_edit');
const popUpEditButton = main.querySelector('.profile__button');
const popUpAddButton = document.querySelector('.profile__add-button');
const popUpAdd = document.querySelector('.pop-up_type_add');
const formEdit = document.querySelector('#edit');
const formAdd = document.querySelector('#add');
let nameInput = document.querySelector('#name'); 
let jobInput = document.querySelector('#job');
let placeInput = document.querySelector('#place'); 
let sourceInput = document.querySelector('#source');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');
const blockTemplate = document.querySelector('#blockTemplate').content;
let elements = document.querySelector('.elements');
let image = document.querySelectorAll('.element__image');

const deleteBlock = (event) => { 
  event.target.closest(".element").remove(); 
}

const setLike = (event) => { 
  event.target.classList.toggle('element__button_active');
}

const openImage = (event) => { 
  let popUpImg = document.querySelector('.pop-up_type_image');
  let clone = event.target.closest('.element');
  let cloneOfImage = event.target.closest('.element__image');
  let cloneOfText = clone.querySelector('.element__text');
  let element = document.querySelector('.pop-up_type_image').cloneNode(true);
  element.querySelector('.pop-up__bigImage').src = cloneOfImage.src;
  element.querySelector('.pop-up__text').textContent = cloneOfText.textContent;
  element.querySelector('.pop-up__closeButton').addEventListener('click',closePopup);
  popUpImg.replaceWith(element);
  element.classList.add('pop-up_unHiden');
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

function openPopup (popup) {
  popup.classList.add('pop-up_unHiden');
  main.querySelectorAll('.pop-up__closeButton')
      .forEach(el => el.addEventListener('click', closePopup));
}

function closePopup() {
  main.querySelectorAll('.pop-up')
  .forEach(el => el.classList.remove('pop-up_unHiden'));
}

//для создания блока
function formAddSave(evt) {
  evt.preventDefault();       
  makeBlock(placeInput,sourceInput);                      
  placeInput.value = ""; //эти две строчки,чтобы обнулить поля,после ввода
  sourceInput.value = "";
}

//создание блока
function makeBlock(place, source){
    let element = blockTemplate.querySelector('.element').cloneNode(true);
    let element__img = element.querySelector('.element__image');
    let element__title = element.querySelector(".element__text");
    element__img.src = source.value;
    element__title.textContent = place.value;
    addBlock(element);  
}

//добавление блока
function addBlock(element){
  elements.prepend(element);
  main.querySelectorAll('.element__bin')
      .forEach(el => el.addEventListener('click', deleteBlock));
  main.querySelectorAll('.element__button')
      .forEach(el => el.addEventListener('click', setLike));
  main.querySelectorAll('.element__image')
      .forEach(el => el.addEventListener('click', openImage));
  closePopup();
}

function popOpenForEditButton(){
    openPopup(popUpEdit);
    setNameAndJob(name, job);
}

function popOpenForAddButton(){
    openPopup(popUpAdd);
}

function formEditSave(evt) {
    evt.preventDefault();                           
    reveseSetNameAndJob(name, job);
    closePopup();
}

popUpAddButton.addEventListener("click", popOpenForAddButton);
popUpEditButton.addEventListener("click", popOpenForEditButton);
formAdd.addEventListener("submit", formAddSave); 
formEdit.addEventListener("submit", formEditSave); 
