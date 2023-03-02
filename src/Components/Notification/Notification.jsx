import { useState } from "react";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import css from "./Notification.module.css";

export const Notification = () => {
  return (
    <div className={css.buttonContainer}>
      <Button
        sx={{
          borderColor: "red",
          background: "red",
          color: "white",
          height: "160px",
          padding: "12px",
          margin: "12px",
          marginTop: "0px",
          width: "420px",
          fontSize: "60px",
          ":hover": { color: "red", borderColor: "red", background: "red" },
        }}
        variant="outlined"
        onClick={(e) => {
          Swal.fire({
            icon: "warning",
            title: "Notification",
            text: "Breaking news: I've just received word from myself that I've sent a notification to myself! In other news, I'm still waiting for a response from myself regarding the urgent matter at hand. Stay tuned for further updates.",
          });
        }}
      >
        BIG RED BUTTON
      </Button>
    </div>
  );
};

//1st tab: There will be a big red button on the screen. Upon press, it will
//send a notification to yourself on the same device.
