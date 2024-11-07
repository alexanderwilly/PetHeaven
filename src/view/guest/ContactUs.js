import React, { useEffect, useState } from 'react';
import NavBar from '../../component/NavBar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import './styles/ContactUs.css';

const ContactUs = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const navigate = useNavigate();

    const handleChangeName = (e) =>{
        setFormData({...formData, name: e.target.value.trim()});
    }

    const handleChangeEmail = (e) =>{
        setFormData({...formData, email: e.target.value.trim()});
    }

    const handleChangeSubject = (e) =>{
        setFormData({...formData, subject: e.target.value.trim()});
    }

    const handleChangeMessage = (e) =>{
        setFormData({...formData, message: e.target.value.trim()});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Regex
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;

        if(formData.name === '' || formData.email === '' || formData.subject === '' || formData.message === ''){
            toast.error('All fields are required!');
            return;
        }

        if(!nameRegex.test(formData.name)){
            toast.error('Invalid name!');
            return;
        }

        if(!emailRegex.test(formData.email)){
            toast.error('Invalid email!');
            return;
        }

        // Send email
        console.log(formData);
        toast.success('Message sent successfully!');
        setTimeout(() => {
            navigate('/PetHeaven');
        }, 1000);



    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main id = "contact-us-page">
            <NavBar />
            <section id = "contact-us-container">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type = "text" id = "name" name = "name" onChange ={handleChangeName} />
                    <label>Email:</label>
                    <input type = "email" id = "email" name = "email" onChange ={handleChangeEmail} />
                    <label>Subject:</label>
                    <input type = "text" id = "subject" name = "subject" onChange ={handleChangeSubject} />
                    <label>Message:</label>
                    <textarea id = "message" name = "message" onChange ={handleChangeMessage}></textarea>
                    <button type = "submit" className = "btn">SEND</button>
                </form>
            </section>
            
            <footer>
                &copy; 2024 Pet Heaven. All Rights Reserved.
            </footer>
        </main>
    );
}
export default ContactUs;