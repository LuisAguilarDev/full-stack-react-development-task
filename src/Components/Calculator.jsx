import { useState } from "react";

export const Calculator = () => {
  const [result, setResult] = useState(0);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [text, setText] = useState("+");
  const [show, setShow] = useState(false);

  function handleChange(e) {
    if (e.target.name === "a") {
      return setA(e.target.value);
    }
    if (e.target.name === "b") {
      return setB(e.target.value);
    }
  }
  async function getSolution() {
    const url = `https://calculatortemprepository.herokuapp.com/calculate/${a}/${b}/${text}`;
    let answer = await fetch(url, { mode: "no-cors" })
      .then((response) => response.json())
      .then((json) => console.log(json));
    setResult(answer);
  }
  return (
    <div className="APPFUNCTION">
      <div className="TEXT">Selecciona una operación:</div>
      <div className="FLEX">
        <input
          className="INPUT"
          name="a"
          onChange={(e) => handleChange(e)}
          type="number"
        />
        <div className="CONTAINER">
          <select
            className="INPUT2"
            onChange={(e) => setText(e.target.value)}
            id="operations"
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
          </select>
        </div>
        <input
          className="INPUT"
          name="b"
          onChange={(e) => setB(e.target.value)}
          type="number"
        />
        <button onClick={() => getSolution()}>CALCULAR </button>
      </div>
      {show ? <div className="TEXT">Resultado: {result}</div> : null}
    </div>
  );
};
