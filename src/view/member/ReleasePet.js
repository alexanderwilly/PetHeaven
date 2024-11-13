import React, {useState, useEffect} from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

import NavBarPortal from "../../component/NavBarPortal";
import LoginLogoutController from "../../controller/LoginLogoutController";

import account_portal from "../../media/account_portal.png";
import adoption_portal from "../../media/adoption_portal.png";
import release_portal from "../../media/release_portal.png";
import volunteer_portal from "../../media/volunteer_portal.png";

import "./styles/ReleasePet.css";

const ReleasePet = () => {

    const navigate = useNavigate();

    const [member, setMember] = useState(undefined);
    const [formData, setFormData] = useState({
        petName : "",
        petType : "",
        petBreed : "",
        petDob : "",
        petGender : "",
        petColor : "",
        petTrained : true,
        petVaccinated : true,
        petPhoto : "",
        medicalHistory : "",
        petPersonality : "",
        reasonForRelease : "",
        disclaimer : false
    });

    const handlePetNameChange = (e) => {
        setFormData({...formData, petName: e.target.value});
    }

    const handlePetTypeChange = (e) => {
        setFormData({...formData, petType: e.target.value});
    }

    const handlePetBreedChange = (e) => {
        setFormData({...formData, petBreed: e.target.value});
    }

    const handlePetDobChange = (e) => {
        setFormData({...formData, petDob: e.target.value});
    }

    const handlePetGenderChange = (e) => {
        setFormData({...formData, petGender: e.target.value});
    }

    const handlePetColorChange = (e) => {
        setFormData({...formData, petColor: e.target.value});
    }

    const handlePetTrainedChange = (e) => {
        setFormData({...formData, petTrained: e.target.value});
    }

    const handlePetVaccinatedChange = (e) => {
        setFormData({...formData, petVaccinated: e.target.value});
    }

    const handlePetPhotoChange = (e) => {
        setFormData({...formData, petPhoto: e.target.value});
    }

    const handleMedicalHistoryChange = (e) => {
        setFormData({...formData, medicalHistory: e.target.value});
    }

    const handlePetPersonalityChange = (e) => {
        setFormData({...formData, petPersonality: e.target.value});
    }

    const handleReasonForReleaseChange = (e) => {
        setFormData({...formData, reasonForRelease: e.target.value});
    }

    const handleDisclaimerChange = (e) => {
        setFormData({...formData, disclaimer: e.target.checked});
    }

    const checkSignedIn = async () => {
        try{
            await new LoginLogoutController({onCheckSignedIn: setMember}).isSignedIn();
        }
        catch(e){
            toast.error(e.message);
        }
    }

    const handleSubmit = async (e) =>{
        try{
            e.preventDefault();

            // Regex
            const textRegex = /^[a-zA-Z\s]+$/;

            // check if all fields are filled
            if(!formData.petName.trim() || !formData.petType.trim() || !formData.petBreed.trim() || !formData.petDob || !formData.petGender.trim() || !formData.petColor.trim() || !formData.petTrained || !formData.petVaccinated || !formData.petPhoto || !formData.medicalHistory.trim() || !formData.petPersonality.trim() || !formData.reasonForRelease.trim()){
                throw new Error("Please fill in all fields");
            }

            // validate each fields
            if(!textRegex.test(formData.petName)){
                throw new Error("Invalid pet name, only letters and spaces are allowed");
            }

            if(!textRegex.test(formData.petType)){
                throw new Error("Invalid pet type, only letters and spaces are allowed");
            }

            if(!textRegex.test(formData.petBreed)){
                throw new Error("Invalid pet breed, only letters and spaces are allowed");
            }

            if(!textRegex.test(formData.petGender)){
                throw new Error("Invalid pet gender, only letters and spaces are allowed");
            }

            if(!textRegex.test(formData.petColor)){
                throw new Error("Invalid pet color, only letters and spaces are allowed");
            }

            // check date of birth (must be before current date)
            const currentDate = new Date();
            const dob = new Date(formData.petDob);
            if(dob >= currentDate){
                throw new Error("Invalid date of birth, must be current date or before");
            }

            // check photo extension (jpg, jpeg, png)
            const photoExtension = formData.petPhoto.split('.').pop();
            if(photoExtension !== "jpg" && photoExtension !== "jpeg" && photoExtension !== "png"){
                throw new Error("Invalid photo extension, only jpg, jpeg and png are allowed");
            }

            // check if disclaimer is checked
            if(!formData.disclaimer){
                throw new Error("Please agree to the disclaimer");
            }

            // submit form
            toast.success("Form submitted successfully. Our team will contact you soon through your registered email.");

            setTimeout(() => {
                navigate("/PetHeaven/member/profile");
            }, 1000);

        }catch(e){
            toast.error(e.message);
        }
    }

    useEffect(() => {
        checkSignedIn();
    }, []);

    if(member){
        return(
            <div id = "profile-page">
                <NavBarPortal />

                <main className="profile-page-container">
                    <aside>
                        <Link id = "aside-btn-account" to = "/PetHeaven/member/profile">
                            <img src={account_portal} alt="acc_icon" />
                            <span>Account</span>
                        </Link>
                        <Link id = "aside-btn-adopt" to = "/PetHeaven/member/adopt">
                            <img src={adoption_portal} alt="adopt_icon" />
                            <span>Adoption</span>
                        </Link>
                        <Link id = "aside-btn-release" to = "/PetHeaven/member/release-pet">
                            <img src={release_portal} alt="release_icon" />
                            <span>Release</span>
                        </Link>
                        <Link id = "aside-btn-volunteer" to = "/PetHeaven/member/volunteer">
                            <img src={volunteer_portal} alt="volunteer_icon" />
                            <span>Volunteer</span>
                        </Link>
                    </aside>


                    <section>
                        <div className = "pet-release-container">
                            <h1>Release My Pet</h1>
                            <p>
                                Once the form is successully submitted, our team will contact you to confirm the release of your pet.
                                Please check your registered email regularly for updates.
                            </p>
                            <form className = "pet-release-form" onSubmit={handleSubmit}>
                                <h2>Pet's Information</h2>

                                <label htmlFor = "pet-name">Name: *</label> <br/>
                                <input type = "text" id = "pet-name" name = "pet-name" placeholder="Enter name ..." value ={formData.petName} onChange={handlePetNameChange}  /><br/>

                                <label htmlFor = "pet-type">Type: *</label> <br/>
                                <select id = "pet-type" name = "pet-type" value ={formData.petType} onChange={handlePetTypeChange}>
                                    <option value = "">Select ... </option>
                                    <option value="Dog">Dog</option>
                                    <option value = "Cat">Cat</option>
                                </select> <br/>

                                <label htmlFor = "pet-breed">Breed: *</label> <br/>
                                <input type = "text" id = "pet-breed" name = "pet-breed" placeholder="Enter breed ..." value ={formData.petBreed} onChange={handlePetBreedChange}  /> <br/>

                                <label htmlFor = "pet-age">Date of Birth: *</label> <br/>
                                <input type = "date" id = "pet-age" name = "pet-age" value ={formData.petDob} onChange={handlePetDobChange}  /> <br/>

                                <label htmlFor = "pet-gender">Gender: *</label> <br/>
                                <select id = "pet-gender" name = "pet-gender" value ={formData.petGender} onChange={handlePetGenderChange}>
                                    <option value = "">Select ... </option>
                                    <option value="Male">Male</option>
                                    <option value = "Female">Female</option>
                                </select> <br/>

                                <label htmlFor = "pet-color">Color: *</label> <br/>
                                <input type = "text" id = "pet-color" name = "pet-color" placeholder="Enter color ..." value ={formData.petColor} onChange={handlePetColorChange} /> <br/>

                                <label htmlFor = "pet-is-trained">Has the animal been trained? *</label> <br/>
                                <select id = "pet-is-trained" name = "pet-is-trained" value ={formData.petTrained} onChange={handlePetTrainedChange}>
                                    <option value = "">Select ... </option>
                                    <option value="Yes">Yes</option>
                                    <option value = "No">No</option>
                                </select> <br/>

                                <label htmlFor = "pet-is-vaccinated">Is the animal vaccinated? *</label> <br/>
                                <select id = "pet-is-vaccinated" name = "pet-is-vaccinated" value ={formData.petVaccinated} onChange={handlePetVaccinatedChange}>
                                    <option value = "">Select ... </option>
                                    <option value="Yes">Yes</option>
                                    <option value = "No">No</option>
                                </select> <br/>

                                <label htmlFor = "pet-photo" >Upload a photo of your pet: *</label> <br/>
                                <input type = "file" id = "pet-photo" name = "pet-photo" value ={formData.petPhoto} onChange={handlePetPhotoChange} accept="image/*" /> <br/>

                                <label htmlFor = "medical-history">Medical History: *</label> <br/>
                                <textarea id = "medical-history" name = "medical-history" value ={formData.medicalHistory} onChange={handleMedicalHistoryChange} ></textarea> <br/>

                                <label htmlFor = "pet-personality">Describe your pet's personality: *</label> <br/>
                                <textarea id = "pet-personality" name = "pet-personality" value ={formData.petPersonality} onChange={handlePetPersonalityChange} ></textarea> <br/>

                                <label htmlFor = "reason-for-release">Reason for release: *</label> <br/>
                                <textarea id = "reason-for-release" name = "reason-for-release" value ={formData.reasonForRelease} onChange={handleReasonForReleaseChange} ></textarea> <br/>

                                <h2>Disclaimer: *</h2>
                                <input type = "checkbox" id = "disclaimer" name = "disclaimer" value ={formData.disclaimer} onChange={handleDisclaimerChange} /> &nbsp;
                                <label htmlFor = "disclaimer">
                                    I agree that the data provided is stored and collected by PetHeaven for the purpose of pet release and rehoming.
                                </label>
                                
                                <br/>

                                <div className="submit-button-container">
                                    <button type = "submit">Submit</button> 
                                </div>
                                

                            </form>
                        </div>
                    </section>
                </main>

            </div>

        );

    }else{
        return(
            <div className = "profile-loading">
                <h1>Loading...</h1>
            </div>
        );
    }

};

export default ReleasePet;