import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPDF6y92P7IKmX9cW2Nn9rlS42GJ1-VjA",
  authDomain: "facial-emotion-recogonition.firebaseapp.com",
  projectId: "facial-emotion-recogonition",
  storageBucket: "facial-emotion-recogonition.appspot.com",
  messagingSenderId: "981928428454",
  appId: "1:981928428454:web:5f453c397ef6f4b14b4567",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const storageBucket = firebase.storage();

export { storageBucket };
