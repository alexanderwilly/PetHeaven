import React, {useState, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import release_pet_img from '../../media/pet_release_img.jpg';

import NavBar from '../../component/NavBar';
import './styles/Adoption.css';

import DisplayAnimalsController from '../../controller/DisplayAnimalsController';
import LoginLogoutController from '../../controller/LoginLogoutController';



const Adoption = () => {
    const [animalsArray, setAnimalsArray] = useState(null);
    const [displayAnimalsArray, setDisplayAnimalsArray] = useState(null);
    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");
    const [type, setType] = useState("all");
    const [gender, setGender] = useState("all");

    const [isFilterSet, setIsFilterSet] = useState(false);
    
    const [member, setMember] = useState(undefined);

    const navigate = useNavigate();
    
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

    const fill_form = () => {
        if(member !== undefined && member !== null){
            navigate("/PetHeaven/release-pet");
        }else{
            navigate("/PetHeaven/login");
        }
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

    return (
        <main id = "adoption-page">
            <NavBar />
            <section id = "adoption-section">
                <h1>Choose Your Buddy</h1>
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
                <div className="animals-container">             
                        {
                            displayAnimalsArray === null  ? <h1>Loading...</h1> : 
                            (
                                displayAnimalsArray.length > 0 ?  
                                displayAnimalsArray.map((animal, index) => {
                                    return (
                                        <div key={index} className="item-adopt">
                                            <img src={animal.image} alt={animal.name} />
                                            <span>{animal.name}</span>
                                        </div>
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
            <section id = "release-pet-section">
            
                <div className = "release-pet-container">
                    <h2>Pet Release</h2>
                    <p>
                        Do you want to release your pet? Please fill in the form below and we will contact you as soon as possible.
                    </p>
                    <button onClick={fill_form}>Fill Form</button>
                </div>
                <img src={release_pet_img} alt="Release Pet" />
            
            </section>
            <footer>
                &copy; 2024 Pet Heaven. All Rights Reserved.
            </footer>
        </main>
    );
}

export default Adoption;