import { db, storage } from "../Services/firebaseDB";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export const Add = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "text"), data);
    return docRef.id;
  } catch (e) {
    return "Error adding document: " + e;
  }
};
export const getData = async () => {
  let querySnapshot = await getDocs(collection(db, "text"));
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const AddPhoto = async (data) => {
  const imgRef = ref(storage, `images/${data.name}`);
  let answer = await uploadBytes(imgRef, data);
  return answer;
};
