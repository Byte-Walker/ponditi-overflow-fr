// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRuBsZ72nT-QQCwGuNH_kqBI_kaHO5qtA",
  authDomain: "ponditi-overflow.firebaseapp.com",
  projectId: "ponditi-overflow",
  storageBucket: "ponditi-overflow.appspot.com",
  messagingSenderId: "42536327850",
  appId: "1:42536327850:web:122c938d95463eca2b4ed3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
