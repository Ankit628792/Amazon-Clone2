import firebase from 'firebase'


  var firebaseConfig = {
    apiKey: "AIzaSyDFQdYDxO3-GcGu5t433BxvKlsgFl-4Ksc",
    authDomain: "amzn-clone-by-ak.firebaseapp.com",
    projectId: "amzn-clone-by-ak",
    storageBucket: "amzn-clone-by-ak.appspot.com",
    messagingSenderId: "309727172986",
    appId: "1:309727172986:web:24e197d272082ccb691ec3",
    measurementId: "G-B2BTV94X00"
  };

  // Initialize Firebase
  const app = !firebase.apps.length ? (firebase.initializeApp(firebaseConfig) ) : (firebase.app()) ;
  const db = app.firestore();

  export default db ;
