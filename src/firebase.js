// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6R4q-NUMe8111r0fqwhgBEulAcovDpu0",
  authDomain: "web-guide-4bc10.firebaseapp.com",
  projectId: "web-guide-4bc10",
  storageBucket: "web-guide-4bc10.appspot.com",
  messagingSenderId: "938234307544",
  appId: "1:938234307544:web:2903087c18595a38b4c8ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);