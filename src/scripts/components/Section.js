export default class Section {
    constructor(items,renderer){
    this.items = items;
    this.renderer = renderer;
    }
    addItem(){
        this.items.forEach((elem) => {
            this.makeCard(elem.name,elem.link,elem.likes.length,elem.owner._id,elem._id);
          })
    }
    makeCard(name,link,likes,ownerId,Id){
        this.renderer(name,link,likes,ownerId,Id)
    }
}

