import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import LoginLogoutController from '../../controller/LoginLogoutController';

import './styles/Login.css';

const Login = () => {

    const [member, setMember] = React.useState(null);

    const login = async (e) => {
        try{
            e.preventDefault();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            await new LoginLogoutController({onLoginSuccess: setMember}).authenticate(email, password);
        }
        catch(e){
            toast.error(e.message);
        }
    }

    const checkSignedIn = async () => {
        try{
            await new LoginLogoutController({onCheckSignedIn: setMember}).isSignedIn();

            if(member){
                toast.success("Login Successful");
                setTimeout(() => {
                    window.location.href = "/PetHeaven";
                }, 750);
            }
        }
        catch(e){
            toast.error(e.message);
        }
    }

    useEffect(() => {
        checkSignedIn();
    });

    

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
                        <Link to = "/PetHeaven/forgot-password">Forgot password?</Link>
                    </div>
                    <button id = "login" onClick={login}>Login</button>
                </form>
            </section>
        </main>
    );
}

export default Login;