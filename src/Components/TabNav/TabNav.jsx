import { useState, useEffect } from "react";

import { Notification } from "../Notification/Notification";
import { Photo } from "../Photo";
import { Text } from "../Text";
import { Calculator } from "../Calculator";
import { useLocalStorage } from "../../CustomHooks/useLocalStorage";

import css from "./TabNav.module.css";

export const TabNav = () => {
  useEffect(() => {
    let temp = getUser("user");
    setName(temp.username.split("@")[0].toUpperCase());
  }, []);
  const [route, setRoute] = useState("");
  const [user, setUser, getUser] = useLocalStorage("user");
  const [name, setName] = useState("");

  function handleClick(evt) {
    const { innerHTML } = evt.target;
    setRoute(innerHTML);
    console.log("click", route, innerHTML);
  }

  return (
    <>
      <nav className={css.navcontainer}>
        <div className={css.titleContainer}>
          <div className={css.title}>CALCULATOR</div>
          <div className={css.title2}>APP</div>
        </div>
        <div className={css.folderTabContainer}>
          <div
            className={
              route === "Notification screen"
                ? css.folderTab + " active"
                : css.folderTab
            }
            name="Notification"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Notification screen
          </div>
          <div
            className={
              route === "Photo screen"
                ? css.folderTab + " active"
                : css.folderTab
            }
            name="Photo"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Photo screen
          </div>
          <div
            name="Text"
            className={
              route === "Text screen"
                ? css.folderTab + " active"
                : css.folderTab
            }
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Text screen
          </div>
          <div
            name="Calculator"
            className={
              route === "Calculator screen"
                ? css.folderTab + " active"
                : css.folderTab
            }
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Calculator screen
          </div>
        </div>
        <div className={css.titleContainer}>
          <div className={css.title}>{name}</div>
        </div>
      </nav>
      {route === "Notification screen" ? <Notification /> : null}
      {route === "Photo screen" ? <Photo /> : null}
      {route === "Text screen" ? <Text /> : null}
      {route === "Calculator screen" ? <Calculator /> : null}
    </>
  );
};
