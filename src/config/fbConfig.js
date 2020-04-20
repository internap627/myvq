import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDRc16NN1bkFwbIOZGi-cd9I7NxKkot9HI",
    authDomain: "myvq-155a8.firebaseapp.com",
    databaseURL: "https://myvq-155a8.firebaseio.com",
    projectId: "myvq-155a8",
    storageBucket: "myvq-155a8.appspot.com",
    messagingSenderId: "522316186235",
    appId: "1:522316186235:web:7d078b153084066aab58de",
    measurementId: "G-2Z4XEEMH05"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
  const db = firebase.firestore()
  db.settings({ timestampsInSnapshots: true })

  export  default firebase
  export  {db}