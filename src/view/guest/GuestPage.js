import React, {useState, useEffect} from 'react';
import NavBar from '../../component/NavBar';
import { Link } from 'react-router-dom';

import hero from '../../media/hero.jpg';
import adopt from '../../media/adopt.png';
import volunteer from '../../media/volunteer.png';
import donate from '../../media/donate.png';

import DisplayAnimalsController from '../../controller/DisplayAnimalsController';

import './styles/GuestPage.css';



const GuestPage = () =>{

    const [animalsArray, setAnimalsArray] = useState([]);
    
    const displayAnimals = async () =>{
        try{
            await new DisplayAnimalsController({changeAnimalsArray: setAnimalsArray}).getAnimals();
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        displayAnimals();
    }, []);

    return (
        <main>
            <NavBar />
            <section id = "hero">
                <div className = "hero-text">
                    <h1>Your New Best Friend Awaits</h1>
                    <h3>Become Their Forever Family</h3>
                    <button>ADOPT NOW</button>
                </div>
                <img src = {hero} alt = "hero" />
            </section>
            <section id = "help-us">
                <h2>How You Can Help</h2>
                <div className = "cards-container">
                    <Link to = "/our-services" className = "card">
                        <h3>
                            <img src = {adopt} alt = "adopt" />
                            ADOPT
                        </h3>
                        <p>
                            Adopt a companion and help us give them a second chance.
                        </p>
                        <span>Learn More</span>
                    </Link>
                    <Link to = "/volunteer" className = "card">
                        <h3>
                            <img src = {volunteer} alt = "volunteer" />
                            VOLUNTEER
                        </h3>
                        <p>
                            Join us and help us care for our animals in need.
                        </p>
                        <span>Learn More</span>
                    </Link>
                    <Link to = "/donate" className = "card">
                        <h3>
                            <img src = {donate} alt = "donate" />
                            DONATE    
                        </h3>
                        <p>
                            Your donation will help us support our animal welfare services.
                        </p>
                        <span>Learn More</span>
                    </Link>
                </div>
            </section>

            <section id = "animals-adoption">
                <h2>Available for Adoption</h2>
                <div className="animals-container">
                    
                        {
                            animalsArray.map((animal, index) => {
                                return (
                                    <div key={index} className="item">
                                        <img src={animal.image} alt={animal.name} />
                                        <span>{animal.name}</span>
                                    </div>
                                );
                            })
                        }
                    
                </div>

            </section>
        </main>
    );
}

export default GuestPage;