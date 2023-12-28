// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  GoogleAuthProvider, getAuth, getRedirectResult } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4NzVey2xmSrCh_EZ14VrP7g2V8YnUw2o",
  authDomain: "project-ts-927d9.firebaseapp.com",
  projectId: "project-ts-927d9",
  storageBucket: "project-ts-927d9.appspot.com",
  messagingSenderId: "1034350788540",
  appId: "1:1034350788540:web:1b983640dcead9f08875b9",
  measurementId: "G-QQ9H3LS0N4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// configure OAuth
 export const authFirebase = getAuth(app);

// tạo provider cho google
export const googleProvider = new GoogleAuthProvider()
