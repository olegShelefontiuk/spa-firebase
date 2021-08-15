
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/firestore'
import {createContext} from "react";
export const Context = createContext(null)


const firebaseConfig = {
    apiKey: "AIzaSyAzCgKj0h5tZh05IV3T2A4N9tE83I1xxqo",
    authDomain: "react-spa-3efc5.firebaseapp.com",
    databaseURL: "https://react-spa-3efc5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-spa-3efc5",
    storageBucket: "react-spa-3efc5.appspot.com",
    messagingSenderId: "1009607611939",
    appId: "1:1009607611939:web:20b12d2f00559258570396",
    measurementId: "G-YGZ1ENYLY1"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig)
// firebase.analytics();




export const provider = new firebase.auth.GoogleAuthProvider()


export default firebase