
import 'firebase/auth';
import 'firebase/firestore';
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
    measurementId: process.env.NEXT_PUBLIC_measurementId
};
// Initialize Firebase for SSR
const app = initializeApp(firebaseConfig, "swag");

// Initialize Firebase services
const firestore = getFirestore(app)
const auth = getAuth(app)

// Expose the instances we'll need
export { app, firestore, auth }
