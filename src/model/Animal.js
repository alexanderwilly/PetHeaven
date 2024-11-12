import axios from 'axios';

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
            const res = await axios.get('https://myfunc-uyqxhlp5gq-uc.a.run.app/animal/getAnimals');
            const animal = [];
            let a;
            for (const doc of res.data.animals){
                a = new Animal();
                a.id = doc.id;
                a.name = doc.name;
                a.type = doc.type;
                a.gender = doc.gender;
                a.image = doc.image;
                a.isAvailable = doc.isAvailable;
                animal.push(a);

                if(isHome){
                    if(animal.length === 6){
                        break;
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
            const res = await axios.get('https://myfunc-uyqxhlp5gq-uc.a.run.app/animal/getAnimalById', {params: {id}});
            const doc = res.data;

            this.id = doc.id;
            this.name = doc.name;
            this.type = doc.type;
            this.birthday = doc.birthday;
            this.breed = doc.breed;
            this.color = doc.color;
            this.gender = doc.gender;
            this.description = doc.description;
            this.image = doc.image;
            this.isAvailable = doc.isAvailable;

            return this;

        }catch(e){
            throw new Error(e);
        }
    }

    
}

export default Animal;