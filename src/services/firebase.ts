import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app  =  initializeApp({
    apiKey: "AIzaSyDVQokorB8B5vl-1AEpvVHrjfmrX1oRL6M",
    authDomain: "mdgfeed-fdc40.firebaseapp.com",
    projectId: "mdgfeed-fdc40",
    storageBucket: "mdgfeed-fdc40.appspot.com",
    messagingSenderId: "730230061257",
    appId: "1:730230061257:web:28660772c9bbea06753518",
    measurementId: "G-K836GP8B2H"
  });

  const storage = getStorage(app);
  const db = getFirestore(app);
  const auth = getAuth(app);

  export {storage, db, auth};