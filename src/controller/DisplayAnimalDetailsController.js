import Animal from "../model/Animal";

class DisplayanimalDetailsController{
    constructor(view){
        this.view = view;
        this.animal = new Animal();
    }

    async getAnimalById(id){
        try{
            this.view.changeAnimal(await this.animal.getAnimalById(id));
        }catch(e){
            throw new Error(e);
        }
    }
}

export default DisplayanimalDetailsController;