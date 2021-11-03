export const BASE_URL = 'https://register.nomoreparties.co';

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
}

// creates a new user
export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => {
            checkResponse(res);
        })
};



export const authorization = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        header: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => {
            checkResponse(res);
        })
        .then((data) => {
            if (data.jwt) {
                localStorage.setItem("jwt", data.jwt);
                return data;
            }
        })
        .catch((err) => console.log(err));
}

// get info from profile, such as username
export const getContent = (token) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "GET",
        header: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((res) => {
            checkResponse(res);
        })
}