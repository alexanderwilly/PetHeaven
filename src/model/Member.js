// import { getDocs, collection } from "firebase/firestore";
// getDoc, doc, query, where, setDoc, Timestamp, updateDoc, orderBy, startAt, endAt, deleteDoc, addDoc
// import { ref, getDownloadURL } from "firebase/storage";
// getStorage, uploadBytes, deleteObject
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import {auth} from '../firebase/firebaseConfig';
// db, storage
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

    async authenticate(email, password){
        try{
            // Authenticate the user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // check if user email is verified
            if(!userCredential.user.emailVerified){
                // resend verification email
                await sendEmailVerification(userCredential.user);
                throw new Error("Please verify your email address\nA verification email has been sent to your email address");
            }else{
                return userCredential.user;
            }
            

        }catch(e){
            // Handle error
            if (e.code === 'auth/user-disabled') {
                throw new Error("Your account is suspended\nPlease contact customer support.");
              } else if (e.code === 'auth/invalid-credential') {
                throw new Error("Invalid email or password");
              } else {
                throw new Error(e.message + "\nPlease try again or contact customer support");
              }
        }
    }

    // check if user is signed in
    async isSignedIn() {
        return new Promise((resolve) => {
            auth.onAuthStateChanged((user) => {
                if (user && user.emailVerified) {
                    resolve(user.uid);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    async signOut (){
        try{
            await auth.signOut();
        }catch(e){
            throw new Error("Error occurred: " + e.message + "\nPlease try again or contact customer support");
        }
    }

}

export default Member;
