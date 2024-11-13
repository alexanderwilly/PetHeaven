
import { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase/firebaseConfig';
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

class Member{
    #name;
    #email;
    #birthday;
    #gender;
    #isVolunteer;
    #availability;
    #volunteerType;

    constructor(name, email, birthday, gender, isVolunteer, availability, volunteerType){
        this.#name = name;
        this.#email = email;
        this.#birthday = birthday;
        this.#gender = gender;
        this.#isVolunteer = isVolunteer;
        this.#availability = availability;
        this.#volunteerType = volunteerType;
    }

    get name(){return this.#name;}
    get email(){return this.#email;}
    get birthday(){return this.#birthday;}
    get gender(){return this.#gender;}
    get isVolunteer(){return this.#isVolunteer;}
    get availability(){return this.#availability;}
    get volunteerType(){return this.#volunteerType;}

    set name(name){this.#name = name;}
    set email(email){this.#email = email;}
    set birthday(birthday){this.#birthday = birthday;}
    set gender(gender){this.#gender = gender;}
    set isVolunteer(isVolunteer){this.#isVolunteer = isVolunteer;}
    set availability(availability){this.#availability = availability;}
    set volunteerType(volunteerType){this.#volunteerType = volunteerType;}

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
            auth.onAuthStateChanged( async (user) => {
                if (user && user.emailVerified) {

                    // Get member data from database
                    const docRef = doc(db, "members", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                
                        resolve(new Member(data.name, data.email, data.birthday.toDate(), data.gender, data.isVolunteer, data.availability, data.volunteerType));
                    }else{
                        resolve(undefined);
                    }
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
                isVolunteer: false,
                availability: "",
                volunteerType: "",
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
