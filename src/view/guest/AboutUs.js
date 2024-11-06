import React from "react";
import NavBar from "../../component/NavBar.js";

import who_we_are from "../../media/about_us.png";
import vision from "../../media/vision.png";
import mission from "../../media/mission.png";

import './styles/AboutUs.css';


const AboutUs = () => {
    return(
        <main id = "about-us-page">
            <NavBar />
            <section id = "who-we-are">
                <h2>Who We Are</h2>
                <div className = "who-we-are-content">
                        <img src = {who_we_are} alt = "Who We Are" />    
                        <p>
                            PetHeaven is a non-profit organization that was founded in 2021. 
                            Our mission is to provide a safe and loving environment for all animals. 
                            We believe that every animal deserves a second chance at life.
                            <br/> <br/> 
                            We are dedicated to helping animals in need by providing them with food, shelter, and medical care. 
                            Our goal is to find loving homes for all of our animals and to educate the public about the importance of animal welfare. 
                            We are committed to making a difference in the lives of animals and to creating a more compassionate world for all living beings.
                        </p>
                </div>
            </section>
            <section id = "vision-mission">
                <h2>Vision & Mission</h2>
                <div className = "vision-mission-content">
                    <div className = "vision">
                        <img src = {vision} alt = "Vision" />
                        <h3>Vision</h3>
                        <p>
                            To promote the welfare of animals and to provide a safe and loving environment for all animals.
                        </p>
                    </div>
                    <div className = "mission">
                        <img src = {mission} alt = "Mission" />
                        <h3>Mission</h3>
                        <p>
                            To provide a safe and loving environment for all animals and to help them find loving homes.
                        </p>
                    </div>
                </div>
            </section>
            <footer>
                &copy; 2024 Pet Heaven. All Rights Reserved.
            </footer>
        </main>
    );
};

export default AboutUs;