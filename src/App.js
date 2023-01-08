import React, { useState, useRef } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("#a020f0").all(10));
  const colorValue = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    let colors;
    try {
      let color = colorValue.current.value.includes("#")
        ? colorValue.current.value
        : `#${colorValue.current.value}`;

      colors = new Values(color).all(10);

      setList(colors);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <section className="container">
        <h3>Tints and Shade generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            ref={colorValue}
            placeholder="#a020f0"
            className={error ? "error" : ""}
          />
          <button className="btn">Generate</button>
        </form>
      </section>
      {error && <h4 className="error-text">Please enter a valid hex color</h4>}
      {!error && (
        <section className="colors">
          {list.map((color, index) => {
            return <SingleColor key={index} {...color} index={index} />;
          })}
        </section>
      )}
    </>
  );
}

export default App;
