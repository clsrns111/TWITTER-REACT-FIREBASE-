import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "twitter-react-firebase-29906.firebaseapp.com",
  projectId: "twitter-react-firebase-29906",
  storageBucket: "twitter-react-firebase-29906.appspot.com",
  messagingSenderId: "807515605947",
  appId: "1:807515605947:web:c727912afe53977720529e",
  measurementId: "G-9CKMSR0EKZ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const AuthService = firebase.auth();
export const dbService = firebase.firestore();
export const firebaseInstance = firebase;
export const StorageService = firebase.storage();
