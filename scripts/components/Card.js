import { popUpImage} from "../script.js";
import { PopupWithImage } from "../components/PopupWithImage.js" 
// popupTypeImage.setEventListeners();


export default class Card {
  constructor(place,source){ 
    this._place = place; 
    this._source = source; 
    this._blockTemplate = document.querySelector('#blockTemplate').content; 
    // this._handleCardClick = handleCardClick;
    // console.log(handleCardClick);
  } 

  _getTemplate(){  
    return this._blockTemplate.querySelector('.element').cloneNode(true); 
  } 

  _setEventListeners(){ 
    // this._img.addEventListener('click', () => {
    //    this._handleCardClick(this._name, this._link)
    // }); 
    this._element.querySelector('.element__bin').addEventListener('click', this._deleteBlock); 
    this._element.querySelector('.element__button').addEventListener('click', this._setLike); 
  } 

  _deleteBlock = (event) => {  
    event.target.closest(".element").remove();  
  } 

  _setLike = (event) => {  
    event.target.classList.toggle('element__button_active'); 
  } 

  makeBlock(){ 
    this._element = this._getTemplate(); 
    this._img = this._element.querySelector('.element__image'); 
    this._title = this._element.querySelector(".element__text"); 
    this._img.src = this._source; 
    this._img.alt = this._place; 
    this._title.textContent = this._place;  
    this._setEventListeners(); 
    return this._element 
  } 
  } 