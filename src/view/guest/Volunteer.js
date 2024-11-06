import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import NavBar from '../../component/NavBar';
import LoginLogoutController from '../../controller/LoginLogoutController';


import volunteer_img  from '../../media/volunteer2.jpg';
import join_us from '../../media/volunteer_img.jpg';
import './styles/Volunteer.css';

const Volunteer = () => {
    const [member, setMember] = useState(undefined);

    const navigate = useNavigate();

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
    }, []);
    return (
        <main id = "volunteer-page">
            <NavBar />
            <section id = "volunteer-section">
                <h2>Be A Volunteer</h2>
                <div className = "volunteer-text">
                    <img src = {volunteer_img} alt = "Volunteer" />
                    <p>
                        Have you ever seen homeless, abused, neglected, or abandoned animals and wanted to help?
                        Have you ever felt helpless and wished you could do something for them?
                        <br /> <br />
                        Yes, you can! You can be a volunteer and help animals in need.
                        As a volunteer, you can help in many ways. A small step can make a big difference!
                    </p>
                    
                </div>

                <h2>What You Can Do</h2>
                
                <ol className = "volunteer-list">
                    <li>
                        <h3>Animal Rescue</h3>
                        <p>
                            Rescue animals that are in danger or in need of help.
                        </p>
                    </li>
                    <li>
                        <h3>Animal Care</h3>
                        <p>
                            Take care of animals in the shelter, including feeding, bathing, and grooming.
                        </p>
                    </li>
                    <li>
                        <h3>Animal Training</h3>
                        <p>
                            Train animals to help them get adopted.
                        </p>
                    </li>
                    <li>
                        <h3>Animal Adoption</h3>
                        <p>
                            Help animals find a new home.
                        </p>
                    </li>
                    <li>
                        <h3>Animal Health</h3>
                        <p>
                            Help animals get medical treatment.
                        </p>
                    </li>
                    
                    <li>
                        <h3>Fund Raising</h3>
                        <p>
                            Help raise funds for the shelter.
                        </p>
                    </li>

                    <li>
                        <h3>Publicity</h3>
                        <p>
                            Help promote our community and events.
                        </p>
                    </li>

                    <li>
                        <h3>Logistics & Transport</h3>
                        <p>
                            Help transport animals and supplies.
                        </p>
                    </li>
                </ol>
                                
            </section>
            <section id = "join-us">
                <div className = "sign-up-text">
                    <h2>Join Us</h2>
                    <p>
                        Interested to be a volunteer? <br/>
                        Fill out the form below and join us in our community.

                    </p>
                    <button onClick={sign_up}>Fill Form</button>
                </div>

                <img src = {join_us} alt = "join_us" />

            </section>
            <footer>
                &copy; 2024 Pet Heaven. All Rights Reserved.
            </footer>
        </main>
    );
}

export default Volunteer;
