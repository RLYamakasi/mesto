export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
      
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

patchProfile(name,about,avatar){
  return fetch(`${this._baseUrl}/users/me`, {
  method: 'PATCH',
  headers: this._headers,
  body: JSON.stringify({
  avatar: avatar,
  name: name,
  about: about
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


  
  
