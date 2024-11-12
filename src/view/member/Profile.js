import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import NavBarPortal from "../../component/NavBarPortal";
import LoginLogoutController from '../../controller/LoginLogoutController'; 

import account_portal from "../../media/account_portal.png";
import adoption_portal from "../../media/adoption_portal.png";
import release_portal from "../../media/release_portal.png";
import volunteer_portal from "../../media/volunteer_portal.png";
import default_user from "../../media/default_user.png";

import "./styles/Profile.css";

const Profile = () => {
    const navigate = useNavigate();

    const [member, setMember] = useState(undefined);

    const checkSignedIn = async () => {
        try{
            await new LoginLogoutController({onCheckSignedIn: setMember}).isSignedIn();
        }
        catch(e){
            toast.error(e.message);
        }
    }

    const handleLogout = async () => {
        try{
            await new LoginLogoutController({onSignOutSuccess: setMember}).signOut();

            toast.success("Successfully logged out!");
            setTimeout(() => {
                navigate("/PetHeaven");
            }, 1000);
        }
        catch(e){
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
                        <div className = 'account-header'>
                            <div className = "profile-info-container">
                                <img src={default_user} alt="user_icon" />
                                <div>
                                    <h1 id = "name-header">
                                        {member ? member.name : "Name..."}
                                    </h1>
                                    <h6 id = "email-header">{member ? member.email : "email..."}</h6>
                                </div>
                            </div>

                            <div className="profile-button-container">
                                {/* <button id="edit-btn">Edit</button> */}
                                <button id="logout-btn" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>


                        <div className = "account-details">
                            <h2>Account Information</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <h6>Name</h6>
                                            <span id = 'name'>{member ? member.name : "NIL"}</span>
                                        </td>
                                        <td>
                                            <h6>Email</h6>
                                            <span id = "email">{member ? member.email : "NIL"}</span>
                                        </td>
                                    </tr>
                                
                                    <tr>
                                        <td>
                                            <h6>Date of Birth</h6>
                                            <span id = "dob">{member ? new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Singapore', year: 'numeric', month: '2-digit', day: '2-digit' }).format(member.birthday) : "NIL"}</span>
                                        </td>
                                        <td>
                                            <h6>Gender</h6>
                                            <span id = "gender">{member ? member.gender : "NIL" }</span>
                                        </td>
                                    </tr>
                                
                                    <tr>
                                        <td>
                                            <h6>Volunteer</h6>
                                            <span id = "volunteer">{member ? (member.isVolunteer ? "Yes" : "No") : "NIL"}</span>
                                        </td>
                                    </tr>
                                </tbody>
                                
                            </table>
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

export default Profile;