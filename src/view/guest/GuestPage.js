import React, {useState, useEffect} from 'react';
import NavBar from '../../component/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import hero from '../../media/hero.jpg';
import adopt from '../../media/adopt.png';
import volunteer from '../../media/volunteer.png';
import donate from '../../media/donate.png';
import join_us  from '../../media/join-us.jpg';

import DisplayAnimalsController from '../../controller/DisplayAnimalsController';
import LoginLogoutController from '../../controller/LoginLogoutController';


import './styles/GuestPage.css';



const GuestPage = () =>{

    const [animalsArray, setAnimalsArray] = useState(null);
    const [member, setMember] = useState(undefined);

    const navigate = useNavigate();
    
    const displayAnimals = async () =>{
        try{
            await new DisplayAnimalsController({changeAnimalsArray: setAnimalsArray}).getAnimalsHome();
        }catch(e){
            toast.error(e.message);
        }
    }

    const checkSignedIn = async () => {
        try{
            await new LoginLogoutController({onCheckSignedIn: setMember}).isSignedIn();
        }
        catch(e){
            toast.error(e.message);
        }
    }

    const sign_up = () => {
        if(member !== undefined && member !== null){
            toast.success("You are already signed in");
            return;
        }else{
            navigate("/PetHeaven/login");
        }
    }

    useEffect(() => {
        checkSignedIn();
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
                    <Link to = "/PetHeaven/adoption" className = "card">
                        <h3>
                            <img src = {adopt} alt = "adopt" />
                            ADOPT
                        </h3>
                        <p>
                            Adopt a companion and help us give them a second chance.
                        </p>
                        <span><u>Learn More</u></span>
                    </Link>
                    <Link to = "/PetHeaven/volunteer" className = "card">
                        <h3>
                            <img src = {volunteer} alt = "volunteer" />
                            VOLUNTEER
                        </h3>
                        <p>
                            Join us and help us care for our animals in need.
                        </p>
                        <span><u>Learn More</u></span>
                    </Link>
                    <Link to = "/PetHeaven/donate" className = "card">
                        <h3>
                            <img src = {donate} alt = "donate" />
                            DONATE    
                        </h3>
                        <p>
                            Your donation will help us support our animal welfare services.
                        </p>
                        <span><u>Learn More</u></span>
                    </Link>
                </div>
            </section>


            <section id = "animals-adoption">
                <h2>Available for Adoption</h2>
                <div className="animals-container">             
                        {
                            animalsArray === null ? <h1>Loading...</h1> : 
                            (
                                animalsArray.length > 0 ? 
                                animalsArray.map((animal, index) => {
                                    return (
                                        <div key={index} className="item">
                                            <img src={animal.image} alt={animal.name} />
                                            <span>{animal.name}</span>
                                        </div>
                                    );
                                })
                                : <h1>No animals available for adoption</h1>
                            )
                            
                        }
                </div>
                <Link className = "view-button" to = "/PetHeaven/adoption">VIEW ALL</Link>
            </section>

            <section id = "join-us">
                <div className = "sign-up-text">
                    <h2>Join Us</h2>
                    <p>
                        Sign up to adopt, volunteer, and be part of our community! <br/>
                        Let's help our stray and abandoned fella find their home.
                    </p>
                    <button onClick={sign_up}>SIGN UP</button>
                </div>

                <img src = {join_us} alt = "join_us" />

            </section>
            <footer>
                &copy; 2024 Pet Heaven. All Rights Reserved.
            </footer>
        </main>
    );
}

export default GuestPage;