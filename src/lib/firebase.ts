
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";
import { getDatabase } from "firebase/database";
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
const db = getFirestore(app);
const rtdb = getDatabase(app);


// Firestore connection check
try {
  onSnapshot(doc(db, "health_check/status"), (doc) => {
    // This is a dummy listener to check the connection.
    // It doesn't need to do anything.
  }, (error) => {
      if (error.code === 'permission-denied' || error.code === 'unimplemented' || error.code === 'failed-precondition') {
          console.warn(
            `%c🔥 Firebase Warning: Firestore is not enabled or security rules are not set up.
            %cPlease go to your Firebase project console, navigate to the 'Firestore Database' section, create a database, and set up security rules to allow reads/writes.
            %cExample rule for testing (allows all reads/writes):
            %c rules_version = '2';
            %c service cloud.firestore {
            %c   match /databases/{database}/documents {
            %c     match /{document=**} {
            %c       allow read, write: if true;
            %c     }
            %c   }
            %c }`,
            'color: orange; font-weight: bold;',
            'color: orange;',
            'font-family: monospace; color: #D97706;',
            'font-family: monospace;',
            'font-family: monospace;',
            'font-family: monospace;',
            'font-family: monospace;',
            'font-family: monospace;',
            'font-family: monospace;',
            'font-family: monospace;'
          );
      }
  });
} catch(e) {
  // Catch potential synchronous errors from getFirestore() if not configured
  console.warn("Could not initialize Firestore. Please ensure it is enabled in your Firebase project.");
}


export { app, auth, db, rtdb };
