import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LoginLogoutController from '../controller/LoginLogoutController'; 

import logo from '../media/logo.png';
import profile_pic from '../media/profile_pic.png';

import './styles/NavBarPortal.css';

const NavBarPortal = () => {
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
    

    useEffect(() => {
        checkSignedIn();
    }, []);

    return (
        <nav className = "navbar">
            <img src = {logo} alt = "logo" onClick={()=>{navigate("/PetHeaven/")}} />

            <div className = "introHead">
                <img src = {profile_pic} alt = "profile_pic" />
                <span>
                    Hi, {member ? member.name : "member"}
                </span>
            </div>
        </nav>
    );
};

export default NavBarPortal;