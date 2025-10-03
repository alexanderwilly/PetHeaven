import { getDocs, collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebaseConfig.js"

class Animal{
    #id;
    #name;
    #type;
    #birthday;
    #breed;
    #color;
    #gender;
    #description;
    #image;
    #isAvailable;
    
    constructor(id, name, type, birthday, breed, color, gender, description, image, isAvailable){
        this.#id = id;
        this.#name = name;
        this.#type = type;
        this.#birthday = birthday;
        this.#breed = breed;
        this.#color = color;
        this.#gender = gender;
        this.#description = description;
        this.#image = image;
        this.#isAvailable = isAvailable;
    }

    get id(){return this.#id;}
    get name(){return this.#name;}
    get type(){return this.#type;}
    get birthday(){return this.#birthday;}
    get breed(){return this.#breed;}
    get color(){return this.#color;}
    get gender(){return this.#gender;}
    get description(){return this.#description;}
    get image(){return this.#image;}
    get isAvailable(){return this.#isAvailable;}

    set id(id){this.#id = id;}
    set name(name){this.#name = name;}
    set type(type){this.#type = type;}
    set birthday(birthday){this.#birthday = birthday;}
    set breed(breed){this.#breed = breed;}
    set color(color){this.#color = color;}
    set gender(gender){this.#gender = gender;}
    set description(description){this.#description = description;}
    set image(image){this.#image = image;}
    set isAvailable(isAvailable){this.#isAvailable = isAvailable;}

    

    async getAnimals(isHome){
        try{
            const q = await getDocs(collection(db, "animals"));
            const animal = [];
            let a;

            for (const doc of q.docs){
                const storageRef = ref(storage, doc.data().image);
                const url = await getDownloadURL(storageRef);

                if(doc.data().isAvailable){
                    a = new Animal();
                    a.id = doc.id;
                    a.name = doc.data().name;
                    a.type = doc.data().type;
                    a.gender = doc.data().gender;
                    a.image = url;
                    a.isAvailable = doc.data().isAvailable;
                    animal.push(a);
                    if(isHome){
                        if(animal.length === 6){
                            break;
                        }
                    }

                }

                
                
            }

            return animal;


        }catch(e){
            throw new Error(e);
        }
    }

    async getAnimalById(id){
        try{
            const docRef = doc(db, 'animals', id);
            const docSnap = await getDoc(docRef);


            if(docSnap.exists()){
                const storageRef = ref(storage, docSnap.data().image);
                const url = await getDownloadURL(storageRef);

                this.id = docSnap.id;
                this.name = docSnap.data().name;
                this.type = docSnap.data().type;
                this.birthday = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Singapore', year: 'numeric', month: '2-digit', day: '2-digit' }).format(docSnap.data().birthday.toDate());
                this.breed = docSnap.data().breed;
                this.color = docSnap.data().color;
                this.gender = docSnap.data().gender;
                this.description = docSnap.data().description;
                this.image = url;
                this.isAvailable = docSnap.data().isAvailable;

                return this;

                


            }else{
                throw new Error("Animal not found");
            }

            

        }catch(e){
            throw new Error(e);
        }
    }

    async adoptAnimalAppointment (id){
        try{

            const docRef = doc(db, "animals", id);
            const docSnap = await getDoc(docRef);

            if(!docSnap.exists()){
                throw new Error("Animal not found");
            }   

            if(!docSnap.data().isAvailable){
                throw new Error("The selected animal is not available.");
            }
            
            await updateDoc(docRef, {
                isAvailable: false
            });
            


        }catch(e){
            throw new Error(e.response.data.error);
            
        }
    }

    
}

export default Animal;