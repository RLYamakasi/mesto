 export const initialCards = [
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
    

    export default class Сard {
    constructor(place, source){
      this.place = place;
      this.source = source;
    }
    _getTemplate(){
      const blockTemplate = document.querySelector('#blockTemplate').content;
      const element = blockTemplate.querySelector('.element').cloneNode(true);
      return element;
    }
    makeBlock(){
      this.element = this._getTemplate();
      this.img = this.element.querySelector('.element__image');
      this.title = this.element.querySelector(".element__text");
      this.img.src = this.source;
      this.img.alt = this.place;
      this.title.textContent = this.place; 
      this.element.querySelector('.element__bin').addEventListener('click', deleteBlock);
      this.element.querySelector('.element__button').addEventListener('click', setLike);
      this.img.addEventListener('click', () => openImage(this.place, this.source))
      return this.element 
  }
  }

import {deleteBlock,setLike,openImage} from "./script.js";
