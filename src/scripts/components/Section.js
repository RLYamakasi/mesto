export default class Section {
    constructor(items,renderer){
    this.items = items;
    this.renderer = renderer;
    this.cardsContainer = document.querySelector('.elements');
    }
    renderItems(){
        this.items.forEach((elem) => {
            this.renderer(elem.name,elem.link,elem.likes,elem.owner._id,elem._id);
          })
    }
    addItem(cardElement){
        this.cardsContainer.prepend(cardElement);
    }
}



