import React, { useState, useRef } from "react";
import "./QrGenerator.css";
interface Props {
  color?: string;
}
export const QrGenerator: React.FC<Props> = ({ color = "#494eea" }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const qrTextRef = useRef<HTMLInputElement>(null);
  const imgBoxRef = useRef<HTMLDivElement>(null);

  const generateQr = () => {
    if (qrTextRef.current && qrTextRef.current.value.length > 0) {
      setImgSrc(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrTextRef.current.value}`
      );
      imgBoxRef.current?.classList.add("showImg");
    } else {
      qrTextRef.current?.classList.add("error");
      setTimeout(() => {
        qrTextRef.current?.classList.remove("error");
      }, 1000);
    }
  };

  return (
    <div className={"container"}>
      <p>Enter your text or URL</p>
      <input
        type="text"
        placeholder="Text or URL"
        ref={qrTextRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ borderColor: color }}
      />
      <div ref={imgBoxRef} className={"imgBox"}>
        {imgSrc && <img src={imgSrc} alt="QR Code" className={"show_img"} />}
      </div>
      <button onClick={generateQr} style={{ backgroundColor: color }}>
        Generate QR Code
      </button>
    </div>
  );
};
