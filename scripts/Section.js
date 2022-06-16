import { initialCards } from "./constants.js";
import Card from "./Card.js"

const elements = document.querySelector('.elements');

export default class section {
    addItem(){
        initialCards.forEach((elem) => { 
            const card = new Card(elem.name, elem.link);  
            const cardElement = card.makeBlock(); 
            this.renderer(cardElement)
          }) 
    }
    renderer(card){
        elements.prepend(card);
    }
}

