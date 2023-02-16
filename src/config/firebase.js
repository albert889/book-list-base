import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import 'firebase/auth'; 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-gyBMUlu2dyb4QpdktX0o47ecG1kEqcA",
  authDomain: "mybook-ee9a8.firebaseapp.com",
  projectId: "mybook-ee9a8",
  storageBucket: "mybook-ee9a8.appspot.com",
  messagingSenderId: "1093872822575",
  appId: "1:1093872822575:web:391b5a0fd960b7fdb8d9da"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firebaseAuthentication = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const storageRef = firebase.storage().ref();