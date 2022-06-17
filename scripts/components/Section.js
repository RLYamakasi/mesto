import { initialCards } from "../constants.js";
import Card from "../components/Card.js"

const elements = document.querySelector('.elements');

export default class section {
    addItem(){
        initialCards.forEach((elem) => {
            this.makeCard(elem.name, elem.link);
          })
    }
    makeCard(name,link){
        const card = new Card(name, link);  
        const cardElement = card.makeBlock(); 
        this.renderer(cardElement)
    }
    renderer(card){
        elements.prepend(card);
    }
}

// function renderStartBlocks() {  
//     initialCards.forEach((elem) => {  
//       renderCard(elem.name, elem.link);  
//     })  
//   }  
//   function createCard(name, link){ 
//     const elem = new Card(name, link);   
//     return elem.makeBlock();  
//   } 
//  function renderCard(name, link){ 
//     const cardElement = createCard(name, link); 
//     elements.prepend(cardElement); 
//   }  