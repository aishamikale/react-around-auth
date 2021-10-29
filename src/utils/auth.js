const { BASE_URL } = 'https://register.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        })
}

export const authorization = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        header: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.jwt) {
                localStorage.setItem("jwt", data.jwt);
                return data;
            }
        })
        .catch((err) => console.log(err));
}