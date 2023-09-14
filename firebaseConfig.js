// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxI2Xoqho7irEQHTKAAqiXPM3MVVMm2hw",
  authDomain: "auto-parts-app.firebaseapp.com",
  projectId: "auto-parts-app",
  storageBucket: "auto-parts-app.appspot.com",
  messagingSenderId: "661004649785",
  appId: "1:661004649785:web:07708574f51f97681b94e8",
  measurementId: "G-2QQDSEK16E",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage();

// Create a storage reference from our storage service
