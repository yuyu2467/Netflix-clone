import * as firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyCwwykN61KHF3pwRgg3Jz-bMcbuf1COlo4",
  authDomain: "authapi-5eabc.firebaseapp.com",
  projectId: "authapi-5eabc",
  storageBucket: "authapi-5eabc.firebasestorage.app",
  messagingSenderId: "690150332208",
  appId: "1:690150332208:web:c3344ff36abde9263adaf5",
  measurementId: "G-NEHHTHCK3S"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export default auth;