import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDUtBk_vILVfaZ61XGP-WrXocqEeJfwhkg",
  authDomain: "tempfiles-7226b.firebaseapp.com",
  projectId: "tempfiles-7226b",
  storageBucket: "tempfiles-7226b.appspot.com",
  messagingSenderId: "678941564362",
  appId: "1:678941564362:web:15df0a2ece7076dd934333",
  measurementId: "G-VN3BSPJ14M",
};
export const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

export const Photo = () => {
  const [route, setRoute] = useState("");
  return <>Photo</>;
};
