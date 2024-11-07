import React, { useEffect } from 'react';
import NavBar from '../../component/NavBar';

import './styles/ContactUs.css';

const ContactUs = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main id = "contact-us-page">
            <NavBar />
            <section id = "contact-us-container">
                <h2>Contact Us</h2>
                <form method = "post">
                    <label>Name:</label>
                    <input type = "text" id = "name" name = "name" required />
                    <label>Email:</label>
                    <input type = "email" id = "email" name = "email" required />
                    <label>Subject:</label>
                    <input type = "text" id = "subject" name = "subject" required />
                    <label>Message:</label>
                    <textarea id = "message" name = "message" required></textarea>
                    <button type = "button" className = "btn">SEND</button>
                </form>
            </section>
            
            <footer>
                &copy; 2024 Pet Heaven. All Rights Reserved.
            </footer>
        </main>
    );
}
export default ContactUs;