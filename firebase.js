import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCCmkoMqdI5uPH3pvdDvQ_OO6WCdSSU9dA",
    authDomain: "chatapp-9e2d4.firebaseapp.com",
    projectId: "chatapp-9e2d4",
    storageBucket: "chatapp-9e2d4.appspot.com",
    messagingSenderId: "542868122729",
    appId: "1:542868122729:web:cba2e233af01eff4ce86f8"
  };

let app;

if(firebase?.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}
else{
  app = firebase.app();
}

//we dont want to initialize the app again and again so we put conditional block.
const db = app.firestore();
const auth = firebase.auth();

export{db, auth};