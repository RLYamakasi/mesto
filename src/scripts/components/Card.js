export default class Card {
  constructor(place,source,like,ownerId,Id,handleCardClick,setLike,deleteLike,myid,listener){
    this.myid = myid;
    this.listener = listener;
    this.deleteLikeApi = deleteLike;
    this.setLikeApi = setLike;
    this.Id = Id;
    this._ownerId = ownerId;
    this._like = like;
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
    this._element.querySelector('.element__bin').addEventListener('click', ()=> this.listener(this.Id,() => this._deleteBlock(this._element)));  
    this._element.querySelector('.element__button').addEventListener('click',()=> this._toogleLike(this._element)); 
  } 

  _toogleLike(element){
    if(element.querySelector('.element__button').classList.contains('element__button_active')){
      this._deleteLike()
    }
    else{
      this._putLike()
    }
  }

  _deleteBlock = (element)=>{
    element.remove()
    element = null;
  }

  _deleteLike = () =>{
    this.deleteLikeApi(this.Id,this._changeToUnActive)
  }  

  _putLike = () => {
    this.setLikeApi(this.Id,this._changeToActive)
  }

  _changeToUnActive = () =>{
    this._element.querySelector('.element__button').classList.remove('element__button_active'); 
    this._element.querySelector('.element__like-count').innerText --; 
  }  

  _changeToActive = () =>{
    this._element.querySelector('.element__button').classList.add('element__button_active'); 
    this._element.querySelector('.element__like-count').innerText ++; 
  }  


  makeBlock(){
    this._element = this._getTemplate();
    if(this._ownerId !== this.myid){
      this._element.querySelector('.element__bin').classList.add('element__bin_hiden');
    }
    for (var i = 0; i < this._like.length; i++) {
      if (this._like[i]._id === this.myid) {
          this._element.querySelector('.element__button').classList.add('element__button_active');
      }
  }
    this._likeCount = this._element.querySelector('.element__like-count'); 
    this._img = this._element.querySelector('.element__image'); 
    this._title = this._element.querySelector(".element__text"); 
    this._likeCount.innerHTML = this._like.length;
    this._img.src = this._source; 
    this._img.alt = this._place; 
    this._title.textContent = this._place;  
    this._setEventListeners(); 
    return this._element 
  } 


  } 