import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ResetPasswordController from "../../controller/ResetPasswordController";
import "./styles/ResetPassword.css";

const ResetPassword = () => {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const emailHandler = (e) => {
        setEmail(e.target.value.trim());
    }

    const resetPasswordHandler = async (e) => {
        e.preventDefault();
        try{
            if(email === ""){
                throw new Error("Please enter your email address");
            }

            await new ResetPasswordController().resetPassword(email);
            toast.success("A password reset link has been sent to your email address if exists");

            setTimeout(() => {
                navigate("/PetHeaven/login");
            }, 1000);
            
        }catch(e){
            toast.error(e.message);
        }
    }

    return(
        <main id = "reset-password-page">
            <Link to = "/PetHeaven/login" >&lt; Back</Link>
            <section id = "reset-password-container">
                <h1>Reset Password</h1>
                <form onSubmit={resetPasswordHandler}>
                    <label>Email</label>
                    <input type = "email" id = "email" value = {email} onChange = {emailHandler} placeholder = "Enter your email" />
                    <button>Reset Password</button>
                </form>
            </section>
        </main> 
    );
};

export default ResetPassword;