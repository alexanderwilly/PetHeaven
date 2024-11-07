import React, {useEffect, useState} from "react";
import { toast } from "react-toastify";

import NavBar from "../../component/NavBar";
import "./styles/Donate.css";
import { useNavigate } from 'react-router-dom';



const Donate = () =>{
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        amount: "",
        proof: null,
        remarks: "",
        agree: false
    });

    const navigate = useNavigate();

    
    
    const handleNameChange = (e) => {
        setFormData({...formData, name: e.target.value.trim()});
    };

    const handleEmailChange = (e) => {
        setFormData({...formData, email: e.target.value.trim()});
    };

    const handlePhoneChange = (e) => {
        setFormData({...formData, phone: e.target.value.trim()});
    };

    const handleAmountChange = (e) => {
        setFormData({...formData, amount: e.target.value.trim()});
    };

    const handleRemarksChange = (e) => {
        setFormData({...formData, remarks: e.target.value.trim()});
    };

    const handleAgreeChange = (e) => {
        setFormData({...formData, agree: e.target.checked});
    };

    const handleFileChange = (e) => {
        // check extension    
        if (e.target.files) {
            setFormData({...formData, proof: e.target.files[0]});
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Regex
        const nameRegex = /^[a-zA-Z\s]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\+[0-9]{8,}$/;
        const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

        // Check if required fields are empty
        if (formData.name === "" || formData.email === "" || formData.phone === "" || formData.amount === "" || formData.proof === null) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Regex Validation
        if (!nameRegex.test(formData.name)) {
            toast.error("Invalid name, please only use alphabets and spaces.");
            return;
        }

        if (!emailRegex.test(formData.email)) {
            toast.error("Invalid email, please enter a valid email address.");
            return;
        }

        if (!phoneRegex.test(formData.phone)) {
            toast.error("Invalid phone number, format example: +65 12345678");
            return;
        }

        if (!amountRegex.test(formData.amount)) {
            toast.error("Invalid amount, please enter a decimal number with 2 decimal places.");
            return;
        }

        // Check if file is an image
        const allowedExtensions = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedExtensions.includes(formData.proof.type)) {
            toast.error("Invalid file type, please upload an image file (jpeg, jpg, png).");
            return;
        }
    

        // Check if user has agreed to declaration
        if (!formData.agree) {
            toast.error("Please agree to the declaration.");
            return;
        }

        // Success
        toast.success("Donation submitted successfully! Thank you for your generosity.");
        setTimeout(() => {
            navigate("/PetHeaven");
        }, 1000);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main id = "donate-page">
            <NavBar />
            <section id = "donate-text">
                <h2>Donate Now</h2>
                <p>
                    Your support makes a world of difference for animals in need. 
                    At PetHeaven, we're dedicated to rescuing, sheltering, and finding loving homes for abandoned and mistreated animals. 
                    Every donation helps provide food, medical care, and safe shelter for these animals as they await their forever homes. 
                    Join us in our mission to give them a second chance, your kindness today can change a life forever.
                    Thank you for your generosity!
                </p>

                <div className = "payment">
                    <h4>Payment Methods</h4>
                    <div>
                        <div className = "method">
                            <h6>PayNow</h6>
                            <p>
                                <strong>Please PayNow to UEN:</strong> T02SS0132E <br/>
                                <strong>PayNow Name:</strong> Pet Heaven<br/>
                            </p>
                        </div>

                        <div className = "method">
                            <h6>Bank Transfer</h6>
                            <p>
                                <strong>Bank:</strong> ABC Bank<br/>
                                <strong>Account Number:</strong> 123-456-789<br/>
                                <strong>Account Name:</strong> Pet Heaven<br/>
                            </p>
                        </div>
                    </div>
                    
                    <h4>My Details</h4>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor = "name">Name: *</label> <br/>
                        <input type = "text" id = "name" name = "name" value = {formData.name} onChange={handleNameChange}/> <br/>

                        <label htmlFor = "email">Email: *</label> <br/>
                        <input type = "email" id = "email" name = "email" value = {formData.email} onChange={handleEmailChange}/> <br/>

                        <label htmlFor = "phone">Phone: *</label> <br/>
                        <input type = "tel" id = "phone" name = "phone" value = {formData.phone} onChange={handlePhoneChange}/> <br/>

                        <label htmlFor = "amount">Amount (SG$): *</label> <br/>
                        <input type = "number" id = "amount" name = "amount" value = {formData.amount} onChange={handleAmountChange}/> <br/>

                        <label htmlFor = "proof">Upload Payment Proof: *</label> <br/>
                        <input type = "file" id = "proof" name = "proof" accept = "image/*" onChange={handleFileChange}/> <br/>

                        <label htmlFor = "remarks">Remarks:</label> <br/>
                        <textarea id = "remarks" name = "remarks" value = {formData.remarks} onChange={handleRemarksChange} ></textarea> <br/>

                        <h4>Declaration *</h4>
                        <input type = "checkbox" id = "agree" name = "agree" checked={formData.agree} onChange={handleAgreeChange}/>
                        <label htmlFor = "agree">
                            By submitting this form, you agree to Pet Heaven collecting,
                            using and/or disclosing your personal data to process your donation/sponsorship.
                        </label> <br/> <br/>

                        <div className = "submit-button-container">
                            <button type = "submit">Submit</button>
                        </div>
                        
                    </form>
                </div>
                

                

            </section>
            <footer>
                &copy; 2024 Pet Heaven. All Rights Reserved.
            </footer>
        </main>
    );
}

export default Donate;
