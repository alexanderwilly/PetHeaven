import React from "react";
import NavBar from "../../component/NavBar";

import who_we_are from "../../media/about_us.png";
import vision from "../../media/vision.png";
import mission from "../../media/mission.png";
import adopter_testimonial from "../../media/adopter_testimonial.jpg";
import resident_testimonial from "../../media/resident_testimonial.jpg";
import volunteer_testimonial from "../../media/volunteer_testimonial.jpg";

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
            <section id = "from-community">
                <h2>
                    Hear From Our Community
                </h2>
                <div className = "from-community-content">
                    <div className = "testimonial">
                        <img src = {adopter_testimonial} alt = "testimonial1" />
                        <div className = "testimonial-content">
                            <p className = "quote">
                                "I adopted my dog from PetHeaven and I couldn't be happier. 
                                They made the adoption process so easy and they were so helpful every step of the way. 
                                I am so grateful for all of the work that they do and for the difference that they are making in the lives of animals."
                            </p>
                            <p className = "author">Ms. Ong</p>
                            <span>Penny's Adopter</span>
                        </div>
                    </div>

                    <div className = "testimonial">
                        <img src = {volunteer_testimonial} alt = "testimonial2" />
                        <div className = "testimonial-content">
                            <p className = "quote">
                                "I have been volunteering at PetHeaven for over a year now and it has been such a rewarding experience.
                                The staff are so caring and dedicated to the animals and they go above and beyond to help them.
                                I am so grateful for the opportunity to be a part of such an amazing organization."
                            </p>
                            <p className = "author">
                                Micah
                            </p>
                            <span>Volunteer</span>
                        </div>
                    </div>

                    <div className = "testimonial">
                        <img src = {resident_testimonial} alt = "testimonial3" />
                        <div className = "testimonial-content">
                            <p className = "quote">
                                "PetHeaven is an amazing organization that truly cares about the welfare of animals. 
                                They go above and beyond to help animals in need and to find them loving homes. 
                                I am so grateful for all of the work that they do and for the difference that they are making in the lives of animals."
                            </p>
                            <p className = "author">Mdm. Lim</p>
                            <span>Resident</span>
                        </div>
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