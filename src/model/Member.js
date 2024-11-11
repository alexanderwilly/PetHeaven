
import { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase/firebaseConfig';
import { doc, setDoc, Timestamp } from "firebase/firestore";

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
                throw new Error("Please verify your email address.\nA verification email has been sent to your email address");
            }else{
                return userCredential.user;
            }
            
        }catch(e){
            // Handle error
            if (e.code === 'auth/user-disabled') {
                throw new Error("Your account is suspended.\nPlease contact customer support.");
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

    async resetPassword(email){
        try{
            await sendPasswordResetEmail(auth, email);
        }catch(e){
            throw new Error("Error occurred: " + e.message + "\nPlease try again or contact customer support");
        }
    }

    async register(name, email, password, gender, dob){
        try{
            // Register the user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Send verification email
            await sendEmailVerification(userCredential.user);

            // Add member to database
            await setDoc(doc(db, "members", userCredential.user.uid), {
                name: name,
                email: email,
                gender: gender,
                dob: Timestamp.fromDate(new Date(dob)),
                isVolunteer: false
            });

        }catch(e){
            if (e.code === 'auth/email-already-in-use') {
                throw new Error("The email provided has already been used. Please use another email.");
            }
            else if (e.code === 'auth/weak-password') {
                throw new Error("The password is too weak. Min 6 characters.");
            }
            else {
                throw new Error("Error occurred: " + e.message + "\nPlease try again or contact customer support.");
            }
        }
    }

}

export default Member;
