import React, {useState, useEffect, useCallback} from 'react';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

import NavBar from '../../component/NavBar';
import DisplayanimalDetailsController from '../../controller/DisplayAnimalDetailsController';

import './styles/PetInfo.css';

const PetInfo = () => {
    let location = useLocation();
    const [pet, setPet] = useState(undefined);

    const displayAnimal = useCallback(async () =>{
        try{
            await new DisplayanimalDetailsController({changeAnimal: setPet}).getAnimalById(location.state.id);
        }catch(e){
            toast.error(e.message);
            setPet(null);
        }
    }, [location.state.id]);


    useEffect(() => {
        window.scrollTo(0, 0);
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

                            <button>Adopt Me</button>

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