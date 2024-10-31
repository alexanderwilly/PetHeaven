import Animal from '../model/Animal.js';

class DisplayAnimalsController{
    constructor(view){
        this.animal = new Animal();
        this.view = view;
    }

    async getAnimals(){
        try{
            this.view.changeAnimalsArray(await this.animal.getAnimals());
        }catch(e){
            throw new Error(e);
        }
    }
}

export default DisplayAnimalsController;