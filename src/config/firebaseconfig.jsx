// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE77g2hQRQqyCp9jE8uj9vCusGJb2F7Jo",
  authDomain: "cvproject2-2eec9.firebaseapp.com",
  projectId: "cvproject2-2eec9",
  storageBucket: "cvproject2-2eec9.appspot.com",
  messagingSenderId: "297268339026",
  appId: "1:297268339026:web:062e14c1b56c46dd159a8b",
  measurementId: "G-31DHM9R5W1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;