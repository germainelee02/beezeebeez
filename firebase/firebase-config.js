// the firebase file used to configurate the firebase stuff

//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA5qVAJbUSVE8OnCRCVoxYewS1_SfXac4",
  authDomain: "beezeebeez-abacb.firebaseapp.com",
  projectId: "beezeebeez-abacb",
  storageBucket: "beezeebeez-abacb.appspot.com",
  messagingSenderId: "848570406418",
  appId: "1:848570406418:web:1b9ba08be0c597ec2baacb"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);


 