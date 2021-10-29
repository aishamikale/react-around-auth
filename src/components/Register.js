import React from "react";

function Register() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');


    // need to handle the submit - what happens after the submit?
    // set the email and password?
    return (
        <section className="register">
            <div className="signup__container">
                <form className="signup__form">
                    <h2 className="signin__heading">Sign Up</h2>
                    <input type="password" placeholder="Email" />
                    <input type="Email" placeholder="Password" />
                    <button type="submit">Sign Up</button>
                </form>
                <div className="register__signin">
                    <p className="register-signin__text">Already a member?</p>
                </div>
            </div>
        </section>
    )
}

export default Register;