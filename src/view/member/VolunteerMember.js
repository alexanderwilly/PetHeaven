import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import NavBarPortal from "../../component/NavBarPortal";
import LoginLogoutController from '../../controller/LoginLogoutController'; 

import account_portal from "../../media/account_portal.png";
import adoption_portal from "../../media/adoption_portal.png";
import release_portal from "../../media/release_portal.png";
import volunteer_portal from "../../media/volunteer_portal.png";

import "./styles/Volunteer.css";

const VolunteerMember = () => {
    const navigate = useNavigate();

    const [member, setMember] = useState(undefined);
    const [formData, setFormData] = useState({
        volunteerType: "",
        availability: ""
    });

    const checkSignedIn = async () => {
        try{
            await new LoginLogoutController({onCheckSignedIn: setMember}).isSignedIn();
        }
        catch(e){
            toast.error(e.message);
        }
    }

    const calculateAge = (dob) => {
        let today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
            age--;
        }
        return age;
    }

    const handleTypeChange = (e) =>{
        setFormData({...formData, volunteerType: e.target.value});
    }

    const handleAvailabilityChange = (e)=>{
        setFormData({...formData, availability: e.target.value});
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            // Check if the form is filled
            if(formData.volunteerType === "" || formData.availability === ""){
                throw new Error("Please fill in all fields.");
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

    useEffect(() => {
        if(member){
            setFormData({
                volunteerType: member.volunteerType,
                availability: member.availability
            });
        }
    }, [member]);

    if(member){
        return(
            <div className = "member-page">
                <NavBarPortal />

                <main className="member-page-container">
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


                    <section id = "member-volunteer-section" >

                        {
                            calculateAge(member.birthday) < 18 ?
                            <div className = "except-container">
                                <h4>Sorry, you must be 18 years or older to volunteer ...</h4>
                            </div>
                                :
                            <div className = "volunteer-form-container">
                                <h1>Be A Volunteer</h1>
                                <p>
                                    Once the form is successully submitted, our team will contact you for confirmation and outcome.
                                    Please check your registered email regularly for updates.
                                </p>
                                <form className="volunteer-form" onSubmit={handleSubmit}>
                                    <h2>Volunteer Type</h2>
                                    <ol className = "volunteer-list-member">
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
                                    <label htmlFor = "volunteer-type">Volunteer Type: *</label> <br/>
                                    <select id = "volunteer-type" name = "volunteer-type" value={formData.volunteerType} onChange={handleTypeChange} >
                                        <option value = "">Select ...</option>
                                        <option value = "Animal Rescue">1. Animal Rescue</option>
                                        <option value = "Animal Care">2. Animal Care</option>
                                        <option value = "Animal Training">3. Animal Training</option>
                                        <option value = "Animal Adoption">4. Animal Adoption</option>
                                        <option value = "Animal Health">5. Animal Health</option>
                                        <option value = "Fund Raising">6. Fund Raising</option>
                                        <option value = "Publicity">7. Publicity</option>
                                        <option value = "Logistics & Transport">8. Logistics & Transport</option>
                                    </select> <br/>

                                    <label htmlFor = "availability">Availability: *</label> <br/>
                                    <select id = "availability" name = "availability" onChange= {handleAvailabilityChange} value = {formData.availability} >
                                        <option value = "">Select ...</option>
                                        <option value = "Weekdays">Weekdays</option>
                                        <option value = "Weekends">Weekends</option>
                                        <option value = "Flexible">Flexible</option>
                                    </select>


                                    {
                                        member.isVolunteer ? 
                                        <div className="submit-button-container">
                                            <button type = "submit">Update</button> 
                                        </div>
                                        :
                                        <div className="submit-button-container">
                                            <button type = "submit">Submit</button> 
                                        </div>
                                    }

                                    

                                </form>
                            </div>
                        }
                        
                    </section>
                </main>

            </div>

        );

    }else{
        return(
            <div className = "member-loading">
                <h1>Loading...</h1>
            </div>
        );
    }

};

export default VolunteerMember;