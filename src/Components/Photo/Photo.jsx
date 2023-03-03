import React, { useRef, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import {
  AddPhoto,
  getPhotos,
  UpdatePhoto,
} from "../../Services/firebaseService";
import css from "./Photo.module.css";

export const PhotoDropZone = ({ onDrop, accept }) => {
  let videoRef = useRef(null);
  let photoRef = useRef(null);
  const [data, setData] = useState([]);
  const [takePic, settakePic] = useState(false);
  const [cameraReplace, setCameraReplace] = useState(false);
  const [fileDestinationState, setFileDestinationState] = useState("");
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });
  useEffect(() => {
    (async function () {
      let dataPhotos = await getPhotos();
      setData(dataPhotos);
    })();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        Swal.fire(err);
      });
  };

  const stopVideo = () => {
    console.log("stop");
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        stream.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
          let video = videoRef.current;
          video.srcObject = null;
        });
        stream = null;
      });
  };

  const takePicture = () => {
    getVideo();
    settakePic(true);
  };

  const printPicture = async (e, option) => {
    console.log(option, !option);
    if (!option) {
      settakePic(false);
      stopVideo();
      const width = 400;
      const height = width / (16 / 9);
      let video = videoRef.current;
      let photo = photoRef.current;
      photo.width = width;
      photo.height = height;
      let ctx = photo.getContext("2d");
      ctx.drawImage(video, 0, 0, width, height);
      photo.toBlob(async function (blob) {
        let file = new File([blob], "image.jpg", { type: "image/jpeg" });
        let answer = await AddPhoto(file);
        Swal.fire({
          icon: "success",
          title: "Notification",
          text: "Document written with ID: " + answer,
        });
        setTimeout(async function () {
          let dataPhotos = await getPhotos();
          setData(dataPhotos);
        }, 1500);
      }, "image/jpeg");
    }
    if (option === "replace") {
      settakePic(false);
      stopVideo();
      const width = 400;
      const height = width / (16 / 9);
      let video = videoRef.current;
      let photo = photoRef.current;
      photo.width = width;
      photo.height = height;
      let ctx = photo.getContext("2d");
      ctx.drawImage(video, 0, 0, width, height);
      photo.toBlob(async function (blob) {
        let file = new File([blob], "image.jpg", { type: "image/jpeg" });
        let answer = UpdatePhoto(file, fileDestinationState);
        Swal.fire({
          icon: "success",
          title: "Notification",
          text: "Document written with ID: " + answer,
        });
        setTimeout(async function () {
          let dataPhotos = await getPhotos();
          setData(dataPhotos);
        }, 1500);
      }, "image/jpeg");
      //
      setCameraReplace(false);
    }
  };

  function selectFile() {
    const fileInput = document.getElementById("file-input");
    fileInput.click();

    return new Promise((resolve, reject) => {
      fileInput.onchange = () => {
        const file = fileInput.files[0];
        if (file) {
          resolve(file);
        } else {
          reject(new Error("No file selected"));
        }
      };
    });
  }
  function convertImageUrl(fileToReplace) {
    console.log(fileToReplace);
    let url2 = fileToReplace.split(".com/");
    let url = url2[2];
    let pathAndFilename = url.split("%2F")[1].split("?")[0];
    let path = pathAndFilename.replace(/%2F/g, "/");
    let newUrl = path;
    return newUrl;
  }
  async function handleFileSelect(fileToReplace) {
    const { value: option } = await Swal.fire({
      title: "Update From:",
      input: "select",
      inputOptions: {
        gallery: "Gallery",
        camera: "Camera",
      },
      inputPlaceholder: "Select Source",
      showCancelButton: true,
    });
    if (!option) {
      return;
    }
    console.log(option);
    if (option === "gallery") {
      let fileDestination = convertImageUrl(fileToReplace);
      try {
        const file = await selectFile();
        console.log("Selected file:", file.name);
        let answer = UpdatePhoto(file, fileDestination);
        Swal.fire({
          icon: "success",
          title: "Notification",
          text: "Document updated with ID: " + answer,
        });
        setTimeout(async function () {
          let dataPhotos = await getPhotos();
          setData(dataPhotos);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
    if (option === "camera") {
      let fileDestination = convertImageUrl(fileToReplace);
      console.log(fileDestination);
      takePicture();
      setCameraReplace(true);
      setFileDestinationState(fileDestination);
    }
  }

  const onDropSave = (acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      let answer = await AddPhoto(file);
      Swal.fire({
        icon: "success",
        title: "Notification",
        text: "Document written with ID: " + answer,
      });
      setTimeout(async function () {
        let dataPhotos = await getPhotos();
        setData(dataPhotos);
      }, 1000);
    });
  };
  return (
    <div className={css.centerMain}>
      {takePic ? (
        <div className={css.cameraDisplay}>
          <div className={css.grid2}>
            <video ref={videoRef}></video>
            {cameraReplace ? (
              <button
                onClick={(e) => {
                  printPicture(e, "replace");
                }}
                className="btn btn-danger container"
              >
                Print Picture
              </button>
            ) : (
              <button
                onClick={(e) => {
                  printPicture(e);
                }}
                className="btn btn-danger container"
              >
                Print Picture
              </button>
            )}
          </div>
        </div>
      ) : (
        <video ref={videoRef} className={css.display}></video>
      )}

      <canvas className={css.display} ref={photoRef}></canvas>
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
                  <p className={css.dropzoneContent}>
                    Release to drop the files here
                  </p>
                ) : (
                  <div className={css.dropzoneContent}>
                    <div>
                      <div>
                        {" "}
                        Drag 'n' drop some files here, or click to select files
                      </div>
                      {takePic ? null : (
                        <div className={css.center}>
                          <Button
                            sx={{
                              borderColor: "transparent",
                              color: "white",
                              height: "40px",
                              padding: "0px",
                              margin: "12px",
                              marginTop: "0px",
                              width: "200px",
                              ":hover": {
                                color: "yellow",
                                borderColor: "yellow",
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              takePicture(e);
                            }}
                            variant="outlined"
                          >
                            or take a picture
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      <input type="file" id="file-input" style={{ display: "none" }} />
      {data?.length > 0 ? (
        <div className={css.grid}>
          {data.map((url, i) => {
            let data = url;
            console.log();
            return (
              <div key={i} className={css.imageContainer}>
                <img
                  onClick={(e) => {
                    handleFileSelect(data);
                  }}
                  className={css.img}
                  src={data}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
