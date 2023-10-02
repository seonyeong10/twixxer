import { authService } from "fbase";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const { target: {name, value} } = event;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                // create account
                data = await authService.createUserWithEmailAndPassword(authService.auth, email, password);
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(authService.auth, email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        const {target: {name}} = event;
        let provider;

        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }

        const data = await signInWithPopup(authService.auth, provider);

        console.log(data);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
                <input type="submit" value={ newAccount ? "Create Account" : "Log In" } />
                {error}
            </form>
            <span onClick={toggleAccount}>{ newAccount ? "Sign in" : "Create Account" }</span>
            <div>
                <button onClick={onSocialClick} name="github">Continue with GitHub</button>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
            </div>
        </div>
    );
};

export default Auth;