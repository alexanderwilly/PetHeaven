import React, {useState, useEffect, useCallback} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import NavBar from '../../component/NavBar';
import DisplayAnimalDetailsController from '../../controller/DisplayAnimalDetailsController';
import LoginLogoutController from '../../controller/LoginLogoutController';


import './styles/PetInfo.css';

const PetInfo = () => {
    let location = useLocation();
    const navigate = useNavigate();
    
    const [pet, setPet] = useState(undefined);
    const [member, setMember] = useState(undefined);

    const displayAnimal = useCallback(async () =>{
        try{
            await new DisplayAnimalDetailsController({changeAnimal: setPet}).getAnimalById(location.state.id);
        }catch(e){
            toast.error(e.message);
            setPet(null);
        }
    }, [location.state.id]);

    const checkSignedIn = async () => {
        try{
            await new LoginLogoutController({onCheckSignedIn: setMember}).isSignedIn();
        }
        catch(e){
            toast.error(e.message);
        }
    }

    const handleAdopt = () => {
        if(member !== undefined && member !== null){
            navigate("/PetHeaven/member/adopt")
        }else{
            navigate("/PetHeaven/login");
        }
    }


    useEffect(() => {
        window.scrollTo(0, 0);
        checkSignedIn();
        displayAnimal();
    }, [displayAnimal]);
    
    return (
        <main>
            <NavBar />

            {
                pet === undefined ?
                <div className = "process-container">
                    <h1> Loading... </h1>
                </div>
                :(
                    pet === null ?
                    <div className = "process-container">
                        <h1> 404 Not Found </h1>
                    </div>
                    :
                    <section id = "pet-info">
                        <div className = "img-container">
                            <img src={pet.image} alt="pet" />
                        </div>
                        
                        <div className = "pet-details">
                            <h1>{pet.name}</h1>
                            <br/>
                            <span><strong>Gender:</strong> {pet.gender}</span> <br/>
                            <span><strong>Birthday:</strong> {pet.birthday}</span> <br/>
                            <span><strong>Type:</strong> {pet.type}</span> <br/>
                            <span><strong>Breed:</strong> {pet.breed}</span> <br/>
                            <span><strong>Color:</strong> {pet.color}</span> <br/>

                            <br/>
                            <p>
                                {pet.description}
                            </p>

                            <button onClick={handleAdopt}>Adopt Me</button>

                        </div>
                    
                    </section>
                    
                
                )
            }
            
            <footer>
                &copy; 2024 Pet Heaven. All Rights Reserved.
            </footer>
            
            
            
            
        </main>
    );

};

export default PetInfo;