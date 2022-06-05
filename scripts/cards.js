export default class Сard {
  constructor(place, source){
    this.place = place;
    this.source = source;
    this.blockTemplate = document.querySelector('#blockTemplate').content;
  }
  _getTemplate(){ 
    return this.blockTemplate.querySelector('.element').cloneNode(true);
   
  }
  _setEventListeners(){
    this.element.querySelector('.element__bin').addEventListener('click', this._deleteBlock);
    this.element.querySelector('.element__button').addEventListener('click', this._setLike);
  }
  _deleteBlock = (event) => { 
    event.target.closest(".element").remove(); 
  }
  _setLike = (event) => { 
    event.target.classList.toggle('element__button_active');
  }
  makeBlock(){
    this.element = this._getTemplate();
    this.img = this.element.querySelector('.element__image');
    this.title = this.element.querySelector(".element__text");
    this.img.src = this.source;
    this.img.alt = this.place;
    this.title.textContent = this.place; 
    this.img.addEventListener('click', () => openImage(this.place, this.source))
    this._setEventListeners();
    return this.element
    
  }
  }

import {openImage} from "./script.js";
