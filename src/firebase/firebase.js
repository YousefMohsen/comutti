// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyj-j9Vrsdy8ERkGc4kmHpnJ3R4eU5osU",
  authDomain: "comutti-45560.firebaseapp.com",
  projectId: "comutti-45560",
  storageBucket: "comutti-45560.appspot.com",
  messagingSenderId: "94120507464",
  appId: "1:94120507464:web:fb1bea6e4710b97d00807d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();;

