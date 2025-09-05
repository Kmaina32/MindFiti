// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "mindfiti",
  "appId": "1:964015669970:web:9ac647fceb1753b69be30b",
  "storageBucket": "mindfiti.firebasestorage.app",
  "apiKey": "AIzaSyB3ZfB_VpQKCQXUdX4eEwVlWSGQpvpy2vc",
  "authDomain": "mindfiti.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "964015669970"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };