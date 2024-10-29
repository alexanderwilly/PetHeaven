import React from 'react';
import logo from '../media/logo.png';
import cross_icon from '../media/cross_icon.png';
import bars_icon from '../media/bars_icon.png';
import './styles/NavBar.css';

import { Link } from 'react-router-dom';    


const NavBar = () => {

    const showSidebar = () =>{
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'flex';
    
    }
    
    const hideSidebar = () =>{
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'none';
    }


    return (
        <nav className = "navbar">
            <img src = {logo} alt = "logo" />

            <ul className = "sidebar">
                <li id = "close-icon" className = "close-icon" >
                    <span onClick={hideSidebar}>
                        <img src = {cross_icon} alt = "cross_icon" />
                    </span>
                </li>
                <li className="sidebar-link"><Link to = "/">HOME</Link></li>
                <li className="sidebar-link"><Link to = "/about-us">ABOUT US</Link></li>
                <li className="sidebar-link"><Link to = "/our-services">OUR SERVICES</Link></li>
                <li className="sidebar-link"><Link to = "/volunteer">VOLUNTEER</Link></li>
                <li className="sidebar-link"><Link to = "/donate">DONATE</Link></li>
                <li className="sidebar-link"><Link to = "/contact-us">CONTACT US</Link></li>
                
            </ul>
            <ul className = "top-nav">
                <li className = "top-nav-link"><Link to = "/">HOME</Link></li>
                <li className = "top-nav-link"><Link to = "/about-us">ABOUT US</Link></li>
                <li className = "top-nav-link"><Link to = "/our-services">OUR SERVICES</Link></li>
                <li className = "top-nav-link"><Link to = "/volunteer">VOLUNTEER</Link></li>
                <li className = "top-nav-link"><Link to = "/donate">DONATE</Link></li>
                <li className = "top-nav-link"><Link to = "/contact-us">CONTACT US</Link></li>
                <li>
                    <button id ="login-btn" className = "btn">LOGIN</button>
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