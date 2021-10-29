import React from "react";

function Login() {
    return (
        <section className="login">
            <div className="login__container">
                <form className="login__form">
                    <h2 className="login__heading">Log in</h2>
                    <input type="password" placeholder="Email" />
                    <input type="Email" placeholder="Password" />
                    <button type="submit">Log in</button>
                </form>
                <div className="register__signin">
                    <p className="register-signin__text">Not a member yet? Sign up here!</p>
                </div>
            </div>
        </section>
    )
}

export default Login;