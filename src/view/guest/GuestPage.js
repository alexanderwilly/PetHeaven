import React, {useState, useEffect} from 'react';
import NavBar from '../../component/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import hero from '../../media/hero.jpg';
import adopt from '../../media/adopt.png';
import volunteer from '../../media/volunteer.png';
import donate from '../../media/donate.png';
import join_us  from '../../media/join-us.jpg';
import arrow_down_icon from '../../media/arrow_down_icon.png';

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

    const handleDropdownFAQ = (e) => {
        const question = e.target.closest('.question');
        if(question){
            const answer = question.nextElementSibling;
            const img = question.querySelector('img');
            if(answer.style.maxHeight === "1000px"){
                answer.style.maxHeight = "0";
                img.style.transform = "rotate(-90deg)";
                answer.style.animationDelay = "0s";
            }else{
                answer.style.maxHeight = "1000px";
                img.style.transform = "rotate(0deg)";
            }

        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
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
                    <Link to ="/PetHeaven/adoption">ADOPT NOW</Link>
                </div>
                <img src = {hero} alt = "hero" />
            </section>
            <section id = "help-us">
                <h2>How You Can Help</h2>
                <div className = "cards-container">
                    <Link to = "/PetHeaven/adoption" className = "card" >
                        <h3>
                            <img src = {adopt} alt = "adopt" />
                            ADOPT
                        </h3>
                        <p>
                            Adopt a companion and help us give them a second chance.
                        </p>
                        <span><u>Learn More</u></span>
                    </Link>
                    <Link to = "/PetHeaven/volunteer" className = "card" style={{ "animationDelay" : "0.2s"}}>
                        <h3>
                            <img src = {volunteer} alt = "volunteer" />
                            VOLUNTEER
                        </h3>
                        <p>
                            Join us and help us care for our animals in need.
                        </p>
                        <span><u>Learn More</u></span>
                    </Link>
                    <Link to = "/PetHeaven/donate" className = "card" style={{ "animationDelay" : "0.4s"}}>
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
                                    const animationDelay = `${index * 0.2}s`;
                                    return (
                                        <Link key={index} className="item-adopt" to = '/PetHeaven/pet-info' state = {{id:animal.id}} style={{ animationDelay }}>
                                            <img src={animal.image} alt={animal.name} />
                                            <span>{animal.name}</span>
                                        </Link>
                                    );
                                })
                                : <h1>No animals available for adoption</h1>
                            )
                            
                        }
                </div>
                <Link className = "view-button" to = "/PetHeaven/adoption">VIEW ALL</Link>
            </section>

            <section id = "caring-pet">
                <h2>Caring for Your Pet</h2>
                <div className = "caring-pet-video">
                    <iframe src="https://www.youtube.com/embed/x2X4vRUb_y0?si=hI94FacKG7g7FwCO" title="How to Take Care of Pets" allow="autoplay;encrypted-media;" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                
            </section>

            <section id = "faq" className = "faq">
                <h2>Frequently Asked Questions</h2>
                <div className ="questions" onClick={handleDropdownFAQ}>
                    <div className = "question">
                        <h3>How much is the adoption fee?</h3>
                        <img src = {arrow_down_icon} alt = "down_icon"/>
                    </div>

                    <div className="answer">
                        <p>
                            <strong>The adoption fee are the following:</strong> <br/>
                            - Puppies (below 6 months old): SG$ 250 <br/>
                            - Adult Dogs (6 months to 7 years old): SG$ 200 <br/>
                            - Senior Dogs (above 7 years old): SG$ 150 <br/>
                            <br/>
                            - Kittens (below 6 months old): SG$ 150 <br/>
                            - Adult Cats (6 months to 7 years old): SG$ 100 <br/>
                            - Senior Cats (above 7 years old): SG$ 50 <br/>
                        </p>
                    </div>
                </div>

                <div className ="questions" onClick={handleDropdownFAQ}>
                    <div className = "question">
                        <h3>
                            Can I adopt if I am not a Singaporean?
                        </h3>
                        <img src = {arrow_down_icon} alt = "down_icon"/>
                    </div>

                    <div className="answer">
                        <p>
                            Yes, you can adopt even if you are not a Singaporean. 
                            However, you must be a permanent resident or have a valid work permit in Singapore.
                        </p>
                    </div>
                </div>

                <div className ="questions" onClick={handleDropdownFAQ}>

                    <div className = "question">
                        <h3>
                            Can I adopt if I live in a HDB flat?
                        </h3>
                        <img src = {arrow_down_icon} alt = "down_icon"/>
                    </div>

                    <div className="answer">
                        <p>
                            Yes, you can adopt even if you live in a HDB flat. 
                            However, you must ensure that the breed of the dog is allowed in HDB flats.
                        </p>
                    </div>
                </div>

                <div className ="questions" onClick={handleDropdownFAQ}>
                    <div className = "question">
                        <h3>
                            Why should I adopt a pet rather than buy?
                        </h3>
                        <img src = {arrow_down_icon} alt = "down_icon"/>
                    </div>

                    <div className="answer">
                        <p>
                            By adopting a pet, you are giving a stray or abandoned animal a second chance. 
                            You are also helping to reduce the number of stray animals in the streets. 
                            Moreover, you are saving a life and giving a pet a loving home.
                        </p>
                    </div>
                </div>
                
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