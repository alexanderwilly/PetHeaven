import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import logo from '../media/logo.png';
import cross_icon from '../media/cross_icon.png';
import bars_icon from '../media/bars_icon.png';
import profile_pic from '../media/profile_pic.png';
import './styles/NavBar.css';
import 'react-toastify/dist/ReactToastify.css';

import { Link, useNavigate } from 'react-router-dom';   
import LoginLogoutController from '../controller/LoginLogoutController'; 


const NavBar = () => {

    const navigate = useNavigate();

    const [member, setMember] = React.useState(undefined);

    const showSidebar = () =>{
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'flex';
    
    }
    
    const hideSidebar = () =>{
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'none';
    }

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

            <ul className = "sidebar">
                <li id = "close-icon" className = "close-icon" >
                    <span onClick={hideSidebar}>
                        <img src = {cross_icon} alt = "cross_icon" />
                    </span>
                </li>
                <li className="sidebar-link"><Link to = "/PetHeaven">HOME</Link></li>
                <li className="sidebar-link"><Link to = "/PetHeaven/about-us">ABOUT US</Link></li>
                <li className="sidebar-link"><Link to = "/PetHeaven/adoption">ADOPTION</Link></li>
                <li className="sidebar-link"><Link to = "/PetHeaven/volunteer">VOLUNTEER</Link></li>
                <li className="sidebar-link"><Link to = "/PetHeaven/donate">DONATE</Link></li>
                <li className="sidebar-link"><Link to = "/PetHeaven/contact-us">CONTACT US</Link></li>
                
            </ul>
            <ul className = "top-nav">
                <li className = "top-nav-link"><Link to = "/PetHeaven">HOME</Link></li>
                <li className = "top-nav-link"><Link to = "/PetHeaven/about-us">ABOUT US</Link></li>
                <li className = "top-nav-link"><Link to = "/PetHeaven/adoption">ADOPTION</Link></li>
                <li className = "top-nav-link"><Link to = "/PetHeaven/volunteer">VOLUNTEER</Link></li>
                <li className = "top-nav-link"><Link to = "/PetHeaven/donate">DONATE</Link></li>
                <li className = "top-nav-link"><Link to = "/PetHeaven/contact-us">CONTACT US</Link></li>
                <li>
                    {
                     member === undefined ?
                    <button id ="login-btn" className = "btn" onClick={()=>navigate("/PetHeaven/login")}>LOGIN</button>
                    :
                    <img src = {profile_pic} alt = "profile_pic" className = "profile_btn" onClick={()=>navigate("/PetHeaven/member/profile")} />
                    
                    }
                </li>
                <li id = "bars-icon" className="bars-icon">
                    <span onClick={showSidebar}>
                        <img src = {bars_icon} alt = "bars_icon" />
                    </span>
                </li>
            </ul>
            
        </nav>
    )
}

export default NavBar;