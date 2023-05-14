import firebase from "firebase/compat";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {

};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
