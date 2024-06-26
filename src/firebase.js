// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUraCQx04NB7EdcG2AbpYX1-BAcpIzMzk",
  authDomain: "filestorage-97e25.firebaseapp.com",
  projectId: "filestorage-97e25",
  storageBucket: "filestorage-97e25.appspot.com",
  messagingSenderId: "547359081040",
  appId: "1:547359081040:web:f7419da9f6ba1307060755"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);