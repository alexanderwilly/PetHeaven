import React, {useEffect, useCallback} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import LoginLogoutController from '../../controller/LoginLogoutController';

import './styles/Login.css';

const Login = () => {

    const [member, setMember] = React.useState(null);
    const navigate = useNavigate();

    const login = async (e) => {
        try{
            e.preventDefault();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

            if(email === "" || password === ""){
                throw new Error("Please fill in all fields");
            }
            if(!emailPattern.test(email)){
                throw new Error("Invalid email format");
            }

            await new LoginLogoutController({onLoginSuccess: setMember}).authenticate(email, password);
        }
        catch(e){
            toast.error(e.message);
        }
    }


    const checkSignedIn = useCallback(async () => {
        if(member){
            toast.success("Login Successful");
            setTimeout(() => {
                navigate("/PetHeaven");
            }, 750);
        }
    }, [member, navigate]);

    useEffect(() => {
        checkSignedIn();
    }, [member, checkSignedIn]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main id = "login-page">
            <Link to = "/PetHeaven" >&lt; Back</Link>
            <section id = "login-container">
                <h1>Login</h1>
                <form>
                    <label>Email</label>
                    <input type = "email" name = "email" id ="email" required />
                    <label>Password</label>
                    <input type = "password" name = "password" id = "password"  required />
                    <div>
                        <Link to = "/PetHeaven/register">Create an account</Link>
                        <Link to = "/PetHeaven/reset-password">Forgot password?</Link>
                    </div>
                    <button id = "login" onClick={login}>Login</button>
                </form>
            </section>
        </main>
    );
}

export default Login;