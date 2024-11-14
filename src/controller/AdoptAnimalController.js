import Animal from "../model/Animal";

class AdoptAnimalController{
    constructor(view){
        this.view = view;
        this.model = new Animal();
    }

    async adoptAnimalAppointment(petId){
        try{
            return await this.model.adoptAnimalAppointment(petId);
        }catch(e){
            throw new Error(e);
        }
    }

}

export default AdoptAnimalController;