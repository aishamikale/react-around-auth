import React from "react";
import { Link } from 'react-router-dom';
// import { authorization } from "../utils/auth";
// import { useHistory } from 'react-router-dom';


function Login({ onLogin }) {
    // const history = useHistory();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(password, email);
    }

    return (
        <div className="form__container">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__title">Log in</h2>
                <input
                    className="form__field"
                    type="email"
                    placeholder="Email"
                    onChange={handleEmail}
                    value={email}
                />
                <input
                    className="form__field"
                    type="password"
                    placeholder="Password"
                    onChange={handlePassword}
                    value={password} />
                <button className="form__submit" type="submit">Log in</button>
                <Link className="form__link" to="signup">Not a member yet? Sign up here!</Link>
            </form>
        </div>
    )
}

export default Login;