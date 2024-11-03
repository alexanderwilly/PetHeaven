import Animal from '../model/Animal.js';

class DisplayAnimalsController{
    constructor(view){
        this.animal = new Animal();
        this.view = view;
    }

    async getAnimalsHome(){
        try{
            this.view.changeAnimalsArray(await this.animal.getAnimals(true));
        }catch(e){
            throw new Error(e);
        }
    }

    async getAnimals(){
        try{
            this.view.changeAnimalsArray(await this.animal.getAnimals(false));
        }catch(e){
            throw new Error(e);
        }
    }

    async displayAnimalsByPage(page, animalsArray) {
        const dar = [];
        for(let i = 6*(page-1); i < 6*page && i < animalsArray.length; i++){
            dar.push(animalsArray[i]);
        }

        this.view.changeDisplayAnimalsArray(dar);
    }

    filterAnimals(search, type, gender, animalsArray) {
        const filteredAnimals = animalsArray.filter(animal => {
            // Filter by search if provided
            const matchesSearch = search ? animal.name.toLowerCase().includes(search.toLowerCase()) : true;
    
            // Filter by type, but allow "all" to bypass this filter
            const matchesType = type === "all" || animal.type === type;
    
            // Filter by gender, but allow "all" to bypass this filter
            const matchesGender = gender === "all" || animal.gender === gender;
    
            // Return true only if all conditions match
            return matchesSearch && matchesType && matchesGender;
        });
    
        return filteredAnimals;
    }
    
    

}

export default DisplayAnimalsController;