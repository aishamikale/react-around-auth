import React from "react";


function Login() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleUsername = () => {


    }

    const handlePassword = () => {

    }

    const handleSubmit = () => {

    }


    return (
        <section className="login">
            <div className="login__container">
                <form className="login__form">
                    <h2 className="login__heading">Log in</h2>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
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