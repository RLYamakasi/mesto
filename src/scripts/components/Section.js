export default class Section {
    constructor(items,renderer){
    this.items = items;
    this.renderer = renderer;
    this.cardsContainer = document.querySelector('.elements');
    }
    addItem(){
        this.items.forEach((elem) => {
            this.makeCard(elem.name,elem.link,elem.likes,elem.owner._id,elem._id);
          })
    }
    makeCard(name,link,likes,ownerId,Id){
        this.renderer(name,link,likes,ownerId,Id)
    }
    renderItems(cardElement){
        this.cardsContainer.prepend(cardElement);
    }
}

