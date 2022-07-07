export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
      
    }

   setLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`,{
      method: 'PUT',
      headers: this._headers,
      })
      }


getInitialCards() {
  return fetch(`${this._baseUrl}/cards`,{
    method: `GET`,
    headers: this._headers,
  })
  }

postCards(name,link){
  return fetch(`${this._baseUrl}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
    name: name,
    link: link
    })
    });
  }

patchProfile(name,about){
  return fetch(`${this._baseUrl}/users/me`, {
  method: 'PATCH',
  headers: this._headers,
  body: JSON.stringify({
  name: name,
  about: about
  })
  });
  }
  
  patchAvatar(avatar){
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
    avatar:avatar
    })
    });
    }




getProfile(){
  return fetch(`${this._baseUrl}/users/me`,{
    method: `GET`,
    headers: this._headers,
  })
}

deleteCard(id){
  return fetch(`${this._baseUrl}/cards/${id}`, {
     method: 'delete',
    headers: this._headers,
    });
  }
  }


  
  
