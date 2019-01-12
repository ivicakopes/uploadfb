import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth'


const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyChwCMoXTDVpI-jdZe9sIY1CHAXLT1ei9g",
  authDomain: "uploadpicfb.firebaseapp.com",
  databaseURL: "https://uploadpicfb.firebaseio.com",
  projectId: "uploadpicfb",
  storageBucket: "uploadpicfb.appspot.com",
  messagingSenderId: "511709578527"
 };
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
