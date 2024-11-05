import axios from 'axios';

class Member{
    #name;
    #email;
    #birthday;
    #gender;
    #isVolunteer;

    constructor(name, email, birthday, gender, isVolunteer){
        this.#name = name;
        this.#email = email;
        this.#birthday = birthday;
        this.#gender = gender;
        this.#isVolunteer = isVolunteer;
    }

    get name(){return this.#name;}
    get email(){return this.#email;}
    get birthday(){return this.#birthday;}
    get gender(){return this.#gender;}
    get isVolunteer(){return this.#isVolunteer;}

    set name(name){this.#name = name;}
    set email(email){this.#email = email;}
    set birthday(birthday){this.#birthday = birthday;}
    set gender(gender){this.#gender = gender;}
    set isVolunteer(isVolunteer){this.#isVolunteer = isVolunteer;}

    async authenticate(email, password) {
        try {
            const res = await axios.post('http://myfunc-uyqxhlp5gq-uc.a.run.app/member/authenticate', { email, password });
            return res.data.user.email; 
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const message = e.response?.data?.error || "An unexpected error occurred.\n" + e;
                throw new Error(message);
            } else {
                throw new Error("An unexpected error occurred.\n" + e);
            }
        }
    }

    // check if user is signed in
    async isSignedIn(){
        try{
            const res = await axios.get('http://myfunc-uyqxhlp5gq-uc.a.run.app/member/isSignedIn');
            return res.data.user;
        }catch(e){
            throw new Error(e);
        }
    }

    async signOut(){
        try{
            await axios.post('http://myfunc-uyqxhlp5gq-uc.a.run.app/member/signOut');
        }catch(e){
            throw new Error(e);
        }
    }
    
}

export default Member;
