//Imports for firebase and auth
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

//create initialize app and use auth as a function
export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDr0zY3OYfzG6gHwkDgJKbLpE7zISZxN_U",
    authDomain: "shadestack-552dc.firebaseapp.com",
    projectId: "shadestack-552dc",
    storageBucket: "shadestack-552dc.appspot.com",
    messagingSenderId: "326095191226",
    appId: "1:326095191226:web:1ee10ee668753d305f9683",
    measurementId: "G-HJ3L04PHTR"
  }).auth();