import React, { useState, useEffect } from "react";
import rgbToHex from "./utils";

const SingleColor = ({ rgb, weight, index, hexColor }) => {
  const [alert, setAlert] = useState(false);
  const bcg = rgb.join(",");
  const hex = rgbToHex(...rgb);
  // Calculating luminance to deterime if the text color should be black or white
  const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;

  useEffect(() => {
    const timeout = setTimeout(() => setAlert(false), 2000);

    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <article
      className={`color ${luminance > 0.5 ? "color-black" : "color-white"}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hex);
      }}
    >
      <p>{weight}%</p>
      <p>{hex}</p>
      {alert && <p className="alert">copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;
