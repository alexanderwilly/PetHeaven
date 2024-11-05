import { getDocs, collection } from "firebase/firestore";
// getDoc, doc, query, where, setDoc, Timestamp, updateDoc, orderBy, startAt, endAt, deleteDoc, addDoc
import { ref, getDownloadURL } from "firebase/storage";
// getStorage, uploadBytes, deleteObject
import {db, storage} from '../firebase/firebaseConfig';
// auth

class Animal{
    #name;
    #type;
    #birthday;
    #breed;
    #color;
    #gender;
    #description;
    #image;
    
    constructor(name, type, birthday, breed, color, gender, description, image){
        this.#name = name;
        this.#type = type;
        this.#birthday = birthday;
        this.#breed = breed;
        this.#color = color;
        this.#gender = gender;
        this.#description = description;
        this.#image = image;
    }

    get name(){return this.#name;}
    get type(){return this.#type;}
    get birthday(){return this.#birthday;}
    get breed(){return this.#breed;}
    get color(){return this.#color;}
    get gender(){return this.#gender;}
    get description(){return this.#description;}
    get image(){return this.#image;}

    set name(name){this.#name = name;}
    set type(type){this.#type = type;}
    set birthday(birthday){this.#birthday = birthday;}
    set breed(breed){this.#breed = breed;}
    set color(color){this.#color = color;}
    set gender(gender){this.#gender = gender;}
    set description(description){this.#description = description;}
    set image(image){this.#image = image;}

    async getPicture(path){
        try{
            const storageRef = ref(storage, path);
            const url = await getDownloadURL(storageRef);
            return url;
        }catch(e){
            throw new Error(e);
        }
    }

    
    async getAnimals(isHome){
        try{
            const q = await getDocs(collection(db, 'animals'));
            const animals = [];
            let animal;
            for (const doc of q.docs){
                animal = new Animal();
                animal.name = doc.data().name;
                animal.type = doc.data().type;
                animal.birthday = doc.data().birthday;
                animal.breed = doc.data().breed;
                animal.color = doc.data().color;
                animal.gender = doc.data().gender;
                animal.description = doc.data().description;
                animal.image = await this.getPicture(doc.data().image);
                animals.push(animal);

                if(isHome){
                    if(animals.length === 6){
                        break;
                    }
                }
            }
            return animals;
        }catch(e){
            throw new Error(e);
        }
    }
}

export default Animal;