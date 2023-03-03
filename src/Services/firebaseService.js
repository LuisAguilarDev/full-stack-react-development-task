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
  let id = makeid(10);
  console.log(data);
  const imgRef = ref(storage, `images/${data.name + id}`);
  let answer = await uploadBytes(imgRef, data);
  console.log(`images/${data.name + id}`);
  return answer;
};

export const UpdatePhoto = async (data, name) => {
  console.log(data);
  const imgRef = ref(storage, `images/${name}`);
  let answer = await uploadBytes(imgRef, data);
  return answer;
};

export const updatePhoto = async (data, name) => {
  const imgRef = ref(storage, `images/${name}`);
  let answer = await uploadBytes(imgRef, data);
  return answer;
};

export const getPhotos = async () => {
  let imagesListRef = ref(storage, "images/");
  let answer = await listAll(imagesListRef).then(async (res) => {
    let data = res.items.map(async (item) => {
      return await getDownloadURL(item).then(async (url) => {
        return await url;
      });
    });
    return data;
  });
  const results = await Promise.all(answer);
  return results;
};

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
