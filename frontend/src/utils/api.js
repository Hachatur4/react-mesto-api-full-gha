class Api {
  constructor(options,) {
    this._options = options;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers.ContentType;
  }

  getAppInfo(){
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
    })
    .then(res => this._checkResStatus(res))
  }

  createCard(data){
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._checkResStatus(res))
  }

  getUserInfo(){
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
    })
    .then(res => this._checkResStatus(res)) 
  }

  sendUserInfo(data){
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => this._checkResStatus(res))
  }

  updateUserAvatar(data){
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(res => this._checkResStatus(res))
  }

  putLike(cardId){
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes `, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
    })
    .then(res => this._checkResStatus(res)) 
  }

  deleteLike(cardId){
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
    })
    .then(res => this._checkResStatus(res)) 
  }

  deleteCard(id){
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
    })
    .then(res => this._checkResStatus(res)) 
  }

  _checkResStatus(res){
    if(res.ok){
      return res.json()
    }else{
      return Promise.reject(`Ошибка ${res.status}`)
    }
  }

}


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '028c01f3-79c5-47ed-9e7a-c79c4643af33',
    ContentType: 'application/json'
  }
})

export default api