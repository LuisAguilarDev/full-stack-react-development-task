import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { appFirebase } from "./Photo";
export const Text = async () => {
  const [data, setData] = useState("");
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       first: "Alan",
  //       middle: "Mathison",
  //       last: "Turing",
  //       born: 1912,
  //     });
  console.log(appFirebase);
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  return (
    <>
      <label htmlFor="">Text</label>
      <input type="text" placeholder="INSERT TEXT HERE" />
      {data ? <>Hola</> : null}
    </>
  );
};
