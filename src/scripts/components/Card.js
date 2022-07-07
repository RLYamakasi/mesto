export default class Card {
  constructor(place,source,like,ownerId,Id,handleCardClick,deleteCardFromServer,setLike,myid){
    this.myid = myid;
    this.setLike = setLike;
    this.deleteCardFromServer = deleteCardFromServer;
    this.Id = Id;
    this._ownerId = ownerId;
    this._like = like;
    this._place = place; 
    this._source = source; 
    this._blockTemplate = document.querySelector('#blockTemplate').content; 
    this._handleCardClick = handleCardClick;
  }
  // _getId(id){
  //   this.id = id
  // }

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
    this._element.remove()
    this.deleteCardFromServer(this.Id)
    ;  
   } 

   _deleteBlock(){
    this._element.remove()
    this.deleteCardFromServer(this.Id)
   }

  _setLike = (event) => {  
    event.target.classList.toggle('element__button_active');
    this._likeCount.innerText ++;
    this.setLike(this.myId)
  } 

  makeBlock(){
    console.log()
    this._element = this._getTemplate();
    if(this._ownerId !== this.myid){
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