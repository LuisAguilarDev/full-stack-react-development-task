import { useState, useEffect } from "react";
import { Add, getData } from "../../Services/firebaseService";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import css from "./Text.module.css";
export const Text = (props) => {
  useEffect(() => {
    (async function () {
      let data = await getData();
      setData(data);
    })();
  }, []);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.length) {
      Swal.fire({
        icon: "warning",
        title: "Notification",
        text: "Please enter text that we can record.",
      });
      return;
    }
    let answer = await Add({ user: props.user.username, text });
    Swal.fire({
      icon: "success",
      title: "Notification",
      text: "Document written with ID: " + answer,
    });
    setText("");
    setData([...data, { user: props.user.username, text, id: answer }]);
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <form action="" className={css.textForm}>
        <div>
          <div className={css.center}>
            <input
              className={css.signUp_input}
              onChange={handleChange}
              type="text"
              value={text}
              placeholder="INSERT TEXT HERE"
            />
          </div>
          <div className={css.center}>
            <Button
              sx={{
                borderColor: "var(--secondary-color)",
                color: "var(--secondary-color)",
                height: "40px",
                padding: "12px",
                margin: "12px",
                marginTop: "0px",
                width: "210px",
                ":hover": { color: "yellow", borderColor: "yellow" },
              }}
              onClick={(e) => {
                handleSubmit(e);
              }}
              variant="outlined"
            >
              SAVE TEXT
            </Button>
          </div>
        </div>
      </form>
      <div className={css.grid}>
        {data.map((i) => {
          return (
            <div key={i.id} id={i.id} className={css.card}>
              <div className={css.center}>
                <div className={css.cardText}>{i.text}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
