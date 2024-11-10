import Member from "../model/Member";

class ResetPasswordController {
    constructor (view){
        this.view = view;
        this.model = new Member();
    }

    async resetPassword(email){
        try{
            await this.model.resetPassword(email);
        }catch(e){
            throw new Error(e.message);
        }
    }
};

export default ResetPasswordController;