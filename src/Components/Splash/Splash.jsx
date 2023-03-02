import { useEffect, useState } from "react";
import css from "./Splash.module.css";

export const Splash = () => {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setTimeout(function () {
      let el = document.getElementById("FadeOutOnRender");
      el.classList.add("animate__fadeOut");
      setTimeout(function () {
        setRender(true);
      }, 1000);
    }, 1500);
  }, []);

  return (
    <div>
      {render ? null : (
        <header
          id="FadeOutOnRender"
          className={css.bgapp + " animate__animated"}
        >
          <div className={css.titleContainer}>
            <div>
              <h1
                className={css.title + " animate__animated animate__fadeInLeft"}
              >
                CALCULATOR
              </h1>
              <h2
                className={
                  css.title2 + " animate__animated animate__fadeInRight"
                }
              >
                APP
              </h2>
            </div>
          </div>
        </header>
      )}
    </div>
  );
};
