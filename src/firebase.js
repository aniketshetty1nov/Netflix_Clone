import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore
} from "firebase/firestore";
import {toast} from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyByKhUJC1mkV7Iwa5myTU8KWzZaXUC_dMI",
  authDomain: "netflix-clone-6c005.firebaseapp.com",
  projectId: "netflix-clone-6c005",
  storageBucket: "netflix-clone-6c005.firebasestorage.app",
  messagingSenderId: "247543644639",
  appId: "1:247543644639:web:108f3953e08d8fa786c46a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=>{
    try{
        const res= await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid:user.uid,
            name,
            authProvider:"local",
            email,

        })
    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}


const login= async(email,password)=>{
    try{
      await  signInWithEmailAndPassword(auth, email, password);
    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = ()=>{
    signOut(auth);

}

export { auth,db, login, signup,logout }