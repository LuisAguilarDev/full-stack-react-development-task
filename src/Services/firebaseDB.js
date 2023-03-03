import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUtBk_vILVfaZ61XGP-WrXocqEeJfwhkg",
  authDomain: "tempfiles-7226b.firebaseapp.com",
  projectId: "tempfiles-7226b",
  storageBucket: "tempfiles-7226b.appspot.com",
  messagingSenderId: "678941564362",
  appId: "1:678941564362:web:15df0a2ece7076dd934333",
  measurementId: "G-VN3BSPJ14M",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore();
