import React from "react";
// import * as auth from "../utils/auth";
// import { useHistory } from "react-router-dom";

function Register({ onRegister }) {
    //let history = useHistory();

    // set state with an object that has
    // email and password
    const [inputs, setInputs] = React.useState({
        email: "",
        password: "",
    });

    // 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // getting the previous state & adding the current one
        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = inputs;
        onRegister(email, password);
    }

    // function handleEmailChange(e) {
    //     setEmail(e.target.value);
    // }

    // function handlePasswordChange(e) {
    //     setPassword(e.target.value);
    // }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     props.onRegister(email, password)
    // }

    return (
        <section className="register">
            <div className="register__container">
                <form className="register__form" onSubmit={handleSubmit} >
                    <h2 className="register__heading">Sign Up</h2>
                    <input
                        className="form__input"
                        name="email" type="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        value={inputs.email}
                    />
                    <input
                        className="form__input"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                        value={inputs.password} />

                    <button className="register__button" type="submit">Sign Up</button>
                </form>
                <div className="register__signin">
                    <p className="register-signin__text">Already a member?</p>
                </div>
            </div>
        </section>
    )
}

export default Register;