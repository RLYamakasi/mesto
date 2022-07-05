export default class Card {
  constructor(place,source,like,ownerId,Id,handleCardClick,openPopCon,popConButton,deleteCardFromServer){
    this.deleteCardFromServer = deleteCardFromServer;
    this.Id = Id;
    this.myId = 'c9e1769999019a990e7af0c9';
    this._ownerId = ownerId;
    this._like = like;
    this.popConButton = popConButton;
    this.openPopCon = openPopCon;
    this._place = place; 
    this._source = source; 
    this._blockTemplate = document.querySelector('#blockTemplate').content; 
    this._handleCardClick = handleCardClick;
  } 

  _getTemplate(){  
    return this._blockTemplate.querySelector('.element').cloneNode(true); 
  } 

  _setEventListeners(){ 
    this._img.addEventListener('click', () => {
        this._handleCardClick(this._place, this._source )
     });
    this._element.querySelector('.element__bin').addEventListener('click', this._confirmDelete);  
    this._element.querySelector('.element__button').addEventListener('click', this._setLike); 
  } 


   _confirmDelete = () => {
    this.openPopCon();
    this.deleteCardFromServer(this.Id)
    this.popConButton.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._element.remove()
    })

    // this.popConButton.addEventListener('click',  this._element.remove());
     console.log(this._element)
    ;  
   } 

   _deleteBlock(){
    this._element.remove()
   }

  _setLike = (event) => {  
    event.target.classList.toggle('element__button_active');
    this._likeCount.innerText ++;
  } 

  makeBlock(){ 
    this._element = this._getTemplate();
    if(this._ownerId !== this.myId){
      this._element.querySelector('.element__bin').classList.add('element__bin_hiden');
    }
    this._likeCount = this._element.querySelector('.element__like-count'); 
    this._img = this._element.querySelector('.element__image'); 
    this._title = this._element.querySelector(".element__text"); 
    this._likeCount.innerHTML = this._like;
    this._img.src = this._source; 
    this._img.alt = this._place; 
    this._title.textContent = this._place;  
    this._setEventListeners(); 
    return this._element 
  } 
  } 