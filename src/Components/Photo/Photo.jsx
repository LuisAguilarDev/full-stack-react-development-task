import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import Swal from "sweetalert2";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import { AddPhoto } from "../../Services/firebaseService";
import { storage } from "../../Services/firebaseDB";
import css from "./Photo.module.css";

export const PhotoDropZone = ({ onDrop, accept }) => {
  let imagesListRef = ref(storage, "images/");
  useEffect(() => {
    console.log("useEffect");
    listAll(imagesListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setData((prev) => [...prev, url]);
        });
      });
    });
    return () => {
      setData([]);
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  const [data, setData] = useState([]);
  const [imgUpload, setImgUpload] = useState(null);

  // const takePicture = () => {
  //   const videoElement = document.getElementById("video");
  //   const canvasElement = document.getElementById("canvas");
  //   navigator.mediaDevices
  //     .getUserMedia({ video: { facingMode: "environment" } })
  //     .then((stream) => {
  //       // Set the video element source to the camera stream
  //       videoElement.srcObject = stream;
  //       videoElement.play();
  //     })
  //     .catch((error) => {
  //       console.error("Error accessing camera:", error);
  //     });
  //   canvasElement.addEventListener("click", () => {
  //     // Draw the video frame on the canvas
  //     const context = canvasElement.getContext("2d");
  //     context.drawImage(
  //       videoElement,
  //       0,
  //       0,
  //       canvasElement.width,
  //       canvasElement.height
  //     );

  //     // Convert the canvas to a data URL
  //     const dataURL = canvasElement.toDataURL();

  //     // Use the data URL to display the image
  //     const imgElement = document.createElement("img");
  //     imgElement.src = dataURL;
  //     document.body.appendChild(imgElement);
  //   });
  // };
  const onDropSave = (acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      setImgUpload(file);
      let answer = await AddPhoto(file);
      Swal.fire({
        icon: "success",
        title: "Notification",
        text: "Document written with ID: " + answer,
      });
    });
  };
  return (
    <div className={css.center}>
      <>
        <Dropzone
          onDrop={(acceptedFiles) => {
            onDropSave(acceptedFiles);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div className={css.dropzoneDiv} {...getRootProps()}>
                <input className="dropzone-input" {...getInputProps()} />
                <div className="text-center">
                  {isDragActive ? (
                    <p className="dropzone-content">
                      Release to drop the files here
                    </p>
                  ) : (
                    <p className="dropzone-content">
                      Drag 'n' drop some files here, or click to select files
                      <button onClick={"takePicture"}>Take Picture</button>
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        {data.map((url, i) => {
          return (
            <div key={i} className={css.imageContainer}>
              <img className={css.img} src={url} />
            </div>
          );
        })}
      </>
    </div>
  );
};
