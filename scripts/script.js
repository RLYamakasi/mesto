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
const blockTemplate = document.querySelector('#blockTemplate').content;
const elements = document.querySelector('.elements');
const image = document.querySelectorAll('.element__image');
const popUpImage = document.querySelector('.pop-up_type_image');
const popBigImage = document.querySelector('.pop-up__bigImage');
const popText = document.querySelector('.pop-up__text');

//const closeButtonEdit = document.querySelector('.closeButton_edit');
//const closeButtonAdd = document.querySelector('.closeButton_add');
//const closeButtonImage = document.querySelector('.closeButton_image');




const deleteBlock = (event) => { 
  event.target.closest(".element").remove(); 
}

const setLike = (event) => { 
  event.target.classList.toggle('element__button_active');
}

const closePopup = (event) => { 
  event.target.closest(".pop-up").classList.toggle('pop-up_unHiden');
}

const openImage = (name, link) => {
  popBigImage.src = link;
  popText.textContent = name;
  popBigImage.alt = name;
  openPopup(popUpImage)
  //console.log(name)
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
}

//function closePopup(popup) {
//  popup.classList.remove('pop-up_unHiden');
//  console.log(popup)
//}

//для создания блока
function formAddSave(evt) {
  evt.preventDefault();     
  makeBlock(placeInput.value, sourceInput.value)                    
  placeInput.value = ""; //эти две строчки,чтобы обнулить поля,после ввода
  sourceInput.value = "";
}

//создание блока
function makeBlock(place, source){
    const element = blockTemplate.querySelector('.element').cloneNode(true);
    const element__img = element.querySelector('.element__image');
    const element__title = element.querySelector(".element__text");
    element__img.src = source;
    element__title.textContent = place; 
    main.querySelectorAll('.element__bin')
    .forEach(el => el.addEventListener('click', deleteBlock));
    main.querySelectorAll('.element__button')
    .forEach(el => el.addEventListener('click', setLike));
    element__img.addEventListener('click', () =>  openImage(place, source))
    elements.prepend(element) // elements.prepend(makeBlock(placeInput.value, sourceInput.value)) не работает
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
}

popUpAddButton.addEventListener("click", popOpenForAddButton);
popUpEditButton.addEventListener("click", popOpenForEditButton);
formAdd.addEventListener("submit", formAddSave); 
formEdit.addEventListener("submit", formEditSave); 

main.querySelectorAll('.pop-up__closeButton')
    .forEach(el => el.addEventListener('click', closePopup));

//это для генерации начальных карточек
function startBlocks(){
  for(i = 0; i < initialCards.length; i++){ 
    makeBlock(initialCards[i].name, initialCards[i].link)
  }  
}

startBlocks()

