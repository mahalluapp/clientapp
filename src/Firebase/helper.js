import { auth, provider } from "./firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
export const addUsertoDB = async (id, data) => {
    try {
        const resp = await setDoc(doc(db, "users", id), data);
        return resp
    } catch (err) {
        console.log(err)
    }
}
export const handleLogin = () => {
    window.location.hash = "login"
    signInWithRedirect(auth, provider)
        .then((result) => {
        }).catch((error) => {
            console.log(error)

        })
};


export const getUserfromDB = async (userid) => {
    const docRef = doc(db, "users", userid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().roles
    } else {
        console.log("No such document!");
        return false
    }
}
export const getPrivates = async (userid) => {
    const docRef = doc(db, "adroles", 'h9wbjUJe37lw8WEE0EGT');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        //   console.log("Document data:", docSnap.data());
        return docSnap.data().ads
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return false
    }
}