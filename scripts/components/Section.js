export default class Section {
    constructor(items,renderer){
    this.items = items;
    this.renderer = renderer;
    }
    addItem(){
        this.items.forEach((elem) => {
            this.makeCard(elem.name, elem.link);
          })
    }
    makeCard(name,link){
        this.renderer(name,link)
    }
}

