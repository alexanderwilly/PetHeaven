import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


// import RegisterController from '../../controller/RegisterController';

import './styles/Register.css';

const Register = () => {

    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        dob: null,
        isChecked: false
    });


    const handleRegister = async (e) => {
        try{
            // Regex
            const namePattern = /^[a-zA-Z\s]+$/;
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

            // Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters
            const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

            e.preventDefault();

            if(formData.name === "" || formData.email === "" || formData.password === "" || formData.confirmPassword === "" || formData.gender === "" || formData.dob === null){
                throw new Error("Please fill in all fields");
            }

            if(!namePattern.test(formData.name)){
                throw new Error("Invalid name format");
            }

            if(!emailPattern.test(formData.email)){
                throw new Error("Invalid email format");
            }

            if(!passwordPattern.test(formData.password)){
                console.log(formData.password);
                throw new Error("Password must contain at least 8 characters, including uppercase, lowercase and numbers");
            }

            if(formData.password !== formData.confirmPassword){
                throw new Error("Passwords do not match");
            }

            if(!formData.isChecked){
                throw new Error("Please agree to the terms and conditions");
            }

            // await new RegisterController().register(formData);

            toast.success("Registration Successful, Please check your email to verify your account");

        }catch(e){
            toast.error(e.message);
        }
    };

    const handleChangeName = (e) => {
        setFormData({...formData, name: e.target.value.trim()});
    }

    const handleChangeEmail = (e) => {
        setFormData({...formData, email: e.target.value.trim()});
    }

    const handleChangePassword = (e) => {
        setFormData({...formData, password : e.target.value});
    }

    const handleChangeConfirmPassword = (e) => {
        setFormData({...formData, confirmPassword: e.target.value});
    }

    const handleChangeGender = (e) => {
        setFormData({...formData, gender: e.target.value});
    }

    const handleChangeDob = (e) => {
        setFormData({...formData, dob: e.target.value});
    }

    const handleCheckTerms = (e) => {
        setFormData({...formData, isChecked: e.target.checked});
    }
    
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return(
        <main id = "register-page">
            <Link to = "/PetHeaven/login" >&lt; Back</Link>
            <section id = "register-container">
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <label htmlFor='name'>Name: *</label>
                    <input type="text" id="name" name = "name" onChange = {handleChangeName} value = {formData.name} placeholder="Enter your name ..." />
                    <label htmlFor = "email">Email: *</label>
                    <input type="email" id="email" name="email" onChange = {handleChangeEmail} value = {formData.email} placeholder="Enter your email ..." />
                    <label htmlFor = "password">Password: *</label>
                    <input type="password" id="password" name = "password" onChange = {handleChangePassword} value = {formData.password} placeholder="Enter your password ..." />
                    <label htmlFor = "confirm-password">Confirm Password: *</label>
                    <input type="password" id="confirm-password" name = "confirm-password" onChange = {handleChangeConfirmPassword} value = {formData.confirmPassword} placeholder="Confirm your password ..." />
                    <label htmlFor = "gender">Gender: *</label>
                    <select name = "gender" id = "gender" onChange = {handleChangeGender} value = {formData.gender}>
                        <option value = "">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <label htmlFor = "dob">Date of Birth: *</label>
                    <input type="date" id="dob" name = "dob" onChange = {handleChangeDob}  />

                    <div className='terms-container'>
                        <input type = "checkbox" name = "terms" id = "terms" checked={formData.isChecked} onChange={handleCheckTerms} />
                        <label htmlFor = "terms">
                            By submitting this form, you agree to Pet Heaven collecting, using and/or disclosing your personal data for the purpose of processing 
                            your registration/transaction and sending you marketing materials. You also agree to our Terms of Service and Privacy Policy.
                        </label>
                    </div>
                    
                    <button type="submit">Register</button>
                </form>    
            </section>
        </main>
    );
};

export default Register;