export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;

  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
} 

  setLike = (id) =>{
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(res => this._getResponseData(res))
  }

  deleteLike = (id)=> {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(res => this._getResponseData(res))
  }


  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: `GET`,
      headers: this._headers,
    }).then(res => this._getResponseData(res))
  }

  postCards = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(res => this._getResponseData(res))
  }

  patchProfile = (name, about)=> {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => this._getResponseData(res))
  }

  patchAvatar = (avatar)=>{
    return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
    avatar:avatar
    })
    }).then(res => this._getResponseData(res))
    }

  getProfile = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: `GET`,
      headers: this._headers,
    }).then(res => this._getResponseData(res))
  }

  deleteCard = (id)=> {
    console.log(id)
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'delete',
      headers: this._headers,
    }).then(res => this._getResponseData(res))
  }
}




