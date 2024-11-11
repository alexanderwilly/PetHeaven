import Member from "../model/Member";

class RegisterController{
    constructor(view){
        this.model = new Member();
        this.view = view;
    }

    async register(name, email, password, gender, dob){
        try{
            await this.model.register(name, email, password, gender, dob);
        }catch(e){
            throw new Error(e.message);
        }
    }
}

export default RegisterController;