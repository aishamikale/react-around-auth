class Api {
    constructor({ baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
    
      return Promise.reject(`Error: ${res.status}`);
    }

    getInitialCards() {
      return fetch(this._baseUrl + "/cards", {
        headers: this._headers
      })
      .then(this._checkResponse)
  }
  //request user info from the server
    getUsersInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(this._checkResponse)
    }

    //get user info and cards from the server
    getAppInfo() {
      return Promise.all([this.getUsersInfo(), this.getInitialCards()])
    }

    addCard({name, link}) {
      return fetch(this._baseUrl + "/cards", {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name,
          link
        })
      })
      .then(this._checkResponse)
    }
    
    editProfile({name, about}) {
      return fetch(this._baseUrl + "/users/me", {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(this._checkResponse)
    }
    
    removeCard(cardId) {
      return fetch(this._baseUrl + "/cards/" + cardId, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponse)
    }
    
    //add and remove likes
    changeLikeCardStatus(cardId, like) {
      if(like) {
        return fetch(this._baseUrl + "/cards/likes/" + cardId, {
          method: "PUT",
          headers: this._headers,
          body: JSON.stringify({
            like
          })
        })
        .then(this._checkResponse)
      } else {
        return fetch(this._baseUrl + "/cards/likes/" + cardId, {
          method: "DELETE",
          headers: this._headers,
        })
        .then(this._checkResponse)
      }
    }
    // addLikes(cardId){
    //   return fetch(this._baseUrl + "/cards/likes/" + cardId, {
    //     method: "PUT",
    //     headers: this._headers,
    //   })
    //   .then(this._checkResponse)
    // }
    // removeLike(cardId){
    //   return fetch(this._baseUrl + "/cards/likes/" + cardId, {
    //     method: "DELETE",
    //     headers: this._headers,
    //   })
    //   .then(this._checkResponse)
    // }


    updateAvatar(avatar) {
      return fetch(this._baseUrl + "/users/me/avatar", {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar
        })
      })
      .then(this._checkResponse)
    }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-7",
  headers: {
    authorization: "0c109f26-b662-41c6-bcff-35a6cf5888c5",
    "Content-Type": "application/json"
  }
});
  
export default api;