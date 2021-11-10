export const BASE_URL = 'https://register.nomoreparties.co';

export const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Error: ${response.status}`);
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
            return res.json();
            // res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        })
};

export const authorization = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        header: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    })
        .then((res) => {
            res.json();
        })
        .then((data) => {
            if (data) {
                localStorage.setItem("token", data.token);
                return data;
            } else {
                return;
            }
        })
        .catch((err) => console.log(err));
}

// get info from profile, such as username
export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        header: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(checkResponse);
    // .catch((err) => {
    //     console.log(err)
    // })
}