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

const dww = {
  name: "Toyota Rear Bumpers T1",
  price: "25000",
  description: "Toyota Rear Bumper model T1",
  image: {
    name: "",
    image:
      "https://firebasestorage.googleapis.com/v0/b/fir-learning-efa3c.appspot.com/o/Group%20280.png?alt=media&token=e37a0bd2-9a18-4c08-8d17-e12930e2be58",
  },
  isLoading: false,
  condition: {
    value: "New",
    text: "New",
    data: [
      {
        id: "new",
        text: "New",
      },
      {
        id: "used",
        text: "Used",
      },
    ],
  },
  newArrival: {
    isLoading: false,
    isDisabled: false,
    value: "true",
    text: "true",
    data: [
      {
        id: "true",
        text: "True",
      },
      {
        id: "false",
        text: "False",
      },
    ],
  },
  subCategory: {
    isLoading: false,
    isDisabled: false,
    value: 1,
    text: "Rear Bumpers",
    data: [
      {
        id: 1,
        text: "Rear Bumpers",
      },
      {
        id: 2,
        text: "Side Steps",
      },
      {
        id: 3,
        text: "Bumpers Front",
      },
      {
        id: 4,
        text: "Doors Front Left",
      },
      {
        id: 5,
        text: "Doors Rear Right",
      },
      {
        id: 6,
        text: "Doors Front Left",
      },
      {
        id: 7,
        text: "Side Door Mirrors",
      },
      {
        id: 8,
        text: "Rear Window Glass",
      },
      {
        id: 9,
        text: "Front Windshields Glass",
      },
    ],
  },
  status: {
    isLoading: false,
    isDisabled: false,
    value: "In Stock",
    text: "In Stock",
    data: [
      {
        id: "In stock",
        text: "In Stock",
      },
      {
        id: "Out of stock",
        text: "Out of stock",
      },
    ],
  },
  make: {
    isLoading: false,
    isDisabled: false,
    value: 1,
    text: "Toyota",
    data: [
      {
        id: 1,
        text: "Toyota",
      },
      {
        id: 2,
        text: "Honda",
      },
      {
        id: 3,
        text: "Ford",
      },
    ],
  },
  model: {
    isLoading: false,
    isDisabled: false,
    value: 1,
    text: "Corolla",
    data: [
      {
        id: 1,
        text: "Corolla",
      },
      {
        id: 2,
        text: "Camry",
      },
      {
        id: 3,
        text: "Rav4",
      },
    ],
  },
  year: {
    isLoading: false,
    isDisabled: false,
    value: 1,
    text: "2021",
    data: [
      {
        id: 1,
        text: "2021",
      },
      {
        id: 2,
        text: "2008",
      },
      {
        id: 3,
        text: "2001",
      },
    ],
  },
};
