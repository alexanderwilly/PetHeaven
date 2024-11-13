import React, {useState, useEffect, useCallback} from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";

import NavBarPortal from "../../component/NavBarPortal";
import LoginLogoutController from '../../controller/LoginLogoutController';
import DisplayAnimalsController from '../../controller/DisplayAnimalsController';


import account_portal from "../../media/account_portal.png";
import adoption_portal from "../../media/adoption_portal.png";
import release_portal from "../../media/release_portal.png";
import volunteer_portal from "../../media/volunteer_portal.png";

import "./styles/Adopt.css";

const Adopt = () => {

    const [member, setMember] = useState(undefined);

    const [animalsArray, setAnimalsArray] = useState(null);
    const [displayAnimalsArray, setDisplayAnimalsArray] = useState(null);
    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");
    const [type, setType] = useState("all");
    const [gender, setGender] = useState("all");

    const [isFilterSet, setIsFilterSet] = useState(false);

    const checkSignedIn = async () => {
        try{
            await new LoginLogoutController({onCheckSignedIn: setMember}).isSignedIn();
        }
        catch(e){
            toast.error(e.message);
        }
    }

    const displayAnimals = async () =>{
        try{
            await new DisplayAnimalsController({changeAnimalsArray: setAnimalsArray}).getAnimals();
        }catch(e){
            toast.error(e.message);
        }
    }

    const displayAnimalsByPage = useCallback(async (arr) => {
        if (animalsArray !== null){
            setDisplayAnimalsArray(null);
            await new DisplayAnimalsController({changeDisplayAnimalsArray: setDisplayAnimalsArray}).displayAnimalsByPage(page, arr);
        }
    }, [animalsArray, page]);

    const filterAnimals = useCallback(async () => {
        if (animalsArray !== null){
            const textRegex = /^[a-zA-Z\s]*$/;
            if (!textRegex.test(search)){
                toast.error("Only letters and spaces are allowed");
                return;
            }
            const fil = new DisplayAnimalsController({changeDisplayAnimalsArray: setDisplayAnimalsArray}).filterAnimals(search, type, gender, animalsArray);
            
            if (isFilterSet){
                setPage(1);
                setIsFilterSet(false);
            }
            

            displayAnimalsByPage(fil);
        }
    }, [search, type, gender, animalsArray, isFilterSet, displayAnimalsByPage]);

    const handleChangeText = (e) =>{
        setSearch(e.target.value);
    }

    const onChangeFilter = (e) =>{
        if (e.target.name === "type"){
            setType(e.target.value);
        }else{
            setGender(e.target.value);
        }

        setIsFilterSet(true);
    }

    
    useEffect(() => {
        window.scrollTo(0, 0);
        checkSignedIn();
        displayAnimals();
    }, []);

    
    useEffect(() => {
        displayAnimalsByPage(animalsArray);
    }, [animalsArray, page, displayAnimalsByPage]);

    useEffect(() => {
        filterAnimals();
    }, [type, gender, filterAnimals]);

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


                    <section>
                        <div className="search-and-filter">
                            <div className="search-bar">
                                <label htmlFor="search">Search: </label>
                                <input type="text" id ="search" placeholder="Search ..." onKeyUp={handleChangeText} />
                            </div>
                            <div className="filter">
                                <div>
                                    <label htmlFor="type">Type: </label>
                                    <select name="type" id="type" onChange={onChangeFilter}>
                                        <option value="all">All</option>
                                        <option value="Dog">Dog</option>
                                        <option value="Cat">Cat</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="gender">Gender: </label>
                                    <select name = "gender" id = "gender" onChange={onChangeFilter}>
                                        <option value="all">All</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                

                            </div>
                        </div>
                        <div className="animals-container-member">
                            {
                                displayAnimalsArray === null  ? <h1>Loading...</h1> : 
                                (
                                    displayAnimalsArray.length > 0 ?  
                                    displayAnimalsArray.map((animal, index) => {
                                        return (
                                            <Link key={index} className="item-adopt-member" to = '/PetHeaven/pet-info' state = {{id:animal.id}}>
                                                <img src={animal.image} alt={animal.name} />
                                                <div>
                                                    <span className = "animal-name-head">{animal.name}</span> <br/>
                                                    <span className = "animal-name-sub">{animal.gender} {animal.type}</span>
                                                </div>
                                            </Link>
                                        );
                                    })
                                    : <h1>No animals available for adoption</h1>
                                )   
                            }
                        </div>
                        {
                            displayAnimalsArray === null ? null : 
                            <div className="pagination">
                                <button onClick={() => {setPage(page-1)} } disabled={page === 1}> &lt; </button>
                                <span>{page}</span>
                                <button onClick={() => {setPage(page+1)} } disabled={displayAnimalsArray.length < 6}> &gt; </button>
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

export default Adopt;