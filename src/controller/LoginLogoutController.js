import Member from '../model/Member.js';

class LoginController{
    constructor(view){
        this.view = view;
        this.member = new Member();
    }

    async authenticate(email, password){
        try{
            const user = await this.member.authenticate(email, password);
            console.log(user);
            this.view.onLoginSuccess(user);
        }catch(e){
            throw new Error(e.message);
        }
    }

    async isSignedIn(){
        this.member.isSignedIn().then((member) => {
            this.view.onCheckSignedIn(member);
        });

    }

    async signOut(){
        try{
            await this.member.signOut();
            this.view.onSignOutSuccess(null);
        }catch(e){
            throw new Error(e.message);
        }
    }
}

export default LoginController;