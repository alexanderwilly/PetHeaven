import React, {useState, useEffect, useCallback} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import NavBar from '../../component/NavBar';
import DisplayAnimalDetailsController from '../../controller/DisplayAnimalDetailsController';
import LoginLogoutController from '../../controller/LoginLogoutController';
import AdoptAnimalController from '../../controller/AdoptAnimalController';


import './styles/PetInfo.css';

const PetInfo = () => {
    let location = useLocation();
    const navigate = useNavigate();
    
    const [pet, setPet] = useState(undefined);
    const [member, setMember] = useState(undefined);

    const [wantAdopt, setWantAdopt] = useState(false);
    const [formData, setFormData] = useState({
        reason: "",
        appointmentDate: "",
        disclaimer: false
    });

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
            setWantAdopt(true);
        }else{
            navigate("/PetHeaven/login");
        }
    }

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age === 0){
            return m + " months";
        }
        return age + " years";
    }

    const handleReasonChange = (e) => {
        setFormData({...formData, reason: e.target.value});
    }

    const handleAppointmentChange = (e) => {
        setFormData({...formData, appointmentDate: e.target.value});
    }

    const handleDisclaimerChange = (e) => {
        setFormData({...formData, disclaimer: e.target.checked});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

            // Check if all fields are filled
            if(formData.reason === "" || formData.appointmentDate === ""){
                throw new Error("Please fill in all fields.");
            }

            // Check if date is not in the past and current
            const today = new Date();
            const appointmentDate = new Date(formData.appointmentDate);
            if(appointmentDate < today){
                throw new Error("Appointment date must be after today.");
            }

            // Check if disclaimer is checked
            if(!formData.disclaimer){
                throw new Error("Please agree to the disclaimer.");
            }

            // Submit form
            await new AdoptAnimalController().adoptAnimalAppointment(pet.id);
            toast.success("Adoption form submitted successfully.");

            setTimeout(() => {
                navigate("/PetHeaven/member/profile");
            }, 750);

        }catch(e){
            if(e.message.includes("Error:")){
                toast.error(e.message.replace("Error:", ""));
            }else{
                toast.error(e.message);
            }
            
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
                    <>
                        <section id = "pet-info">
                            <div className = "img-container">
                                <img src={pet.image} alt="pet" />
                            </div>
                            
                            <div className = "pet-details">
                                <h1>{pet.name}</h1>
                                <br/>
                                <span><strong>Gender:</strong> {pet.gender}</span> <br/>
                                <span><strong>Birthday:</strong> {pet.birthday} ({calculateAge(pet.birthday)})</span> <br/>
                                <span><strong>Type:</strong> {pet.type}</span> <br/>
                                <span><strong>Breed:</strong> {pet.breed}</span> <br/>
                                <span><strong>Color:</strong> {pet.color}</span> <br/>

                                <br/>
                                <p>
                                    {pet.description}
                                </p>

                                {
                                    wantAdopt ? 
                                    null
                                    :
                                    <button onClick={handleAdopt}>Adopt Me</button>
                                }

                            </div>
                        
                        </section>
                        {
                            wantAdopt ?
                            <section id = "adoption-form-container">
                                
                                <form className="adoption-form" onSubmit={handleSubmit}>
                                    <h1>Adoption Form - {pet.name}</h1>
                                    <label htmlFor="reason">Reason for adopting {pet.name}: *</label> <br/>
                                    <textarea id="reason" name="reason" value = {formData.reason} onChange = {handleReasonChange} ></textarea> <br/>

                                    <label htmlFor = "appointment-date">Preferred Appointment Date (Flexible Timings): *</label> <br/>
                                    <input type="date" id="appointment-date" name="appointment-date" value = {formData.appointmentDate} onChange = {handleAppointmentChange}/> <br/>

                                    <h2>Disclaimer: *</h2>
                                    <input type = "checkbox" id = "disclaimer" name = "disclaimer" value ={formData.disclaimer} onChange={handleDisclaimerChange} /> &nbsp;
                                    <label htmlFor = "disclaimer">
                                        I agree that the data provided is stored and collected by PetHeaven for the purpose of pet adoption.
                                    </label>

                                    <br/>

                                    <div className="submit-button-container">
                                        <button type = "submit">Submit</button> 
                                    </div>
                                    
                                </form>
                            </section>
                            :
                            null
                        }
                    
                    </>

                    
                    
                
                )
            }
            
            <footer>
                &copy; 2024 Pet Heaven. All Rights Reserved.
            </footer>
            
            
            
            
        </main>
    );

};

export default PetInfo;