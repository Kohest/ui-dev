import React, { useState } from "react";
import "./Calculator.css";

export const Calculator: React.FC = () => {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [sign, setSign] = useState<string>("");
  const [finish, setFinish] = useState<boolean>(false);
  const [display, setDisplay] = useState<string>("0");

  const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const action = ["-", "+", "X", "/"];

  const clearAll = () => {
    setA("");
    setB("");
    setSign("");
    setFinish(false);
    setDisplay("0");
  };

  const handleClick = (key: string) => {
    if (digit.includes(key)) {
      if (b === "" && sign === "") {
        setA((prevA) => {
          const newA = prevA + key;
          setDisplay(newA);
          return newA;
        });
      } else if (a !== "" && b !== "" && finish) {
        setB(key);
        setFinish(false);
        setDisplay(key);
      } else {
        setB((prevB) => {
          const newB = prevB + key;
          setDisplay(newB);
          return newB;
        });
      }
      return;
    }

    if (action.includes(key)) {
      setSign(key);
      setDisplay(key);
      return;
    }

    if (key === "=") {
      if (b === "") {
        setB(a);
      }
      let result;
      switch (sign) {
        case "+":
          result = +a + +b;
          break;
        case "-":
          result = +a - +b;
          break;
        case "X":
          result = +a * +b;
          break;
        case "/":
          if (b === "0") {
            setDisplay("Error");
            clearAll();
            return;
          }
          result = +a / +b;
          break;
        default:
          return;
      }
      setA(result.toString());
      setFinish(true);
      setDisplay(result.toString());
    }
  };

  return (
    <div className="calculatorContainer">
      <div className="calc_screen">
        <p>{display}</p>
      </div>
      <div className="calculator_buttons">
        <div className="btn ac bg-grey" onClick={clearAll}>
          ac
        </div>
        <div className="btn plus_minus bg-grey">+/-</div>
        <div className="btn percent bg_grey">%</div>
        <div className="btn division bg_grey" onClick={() => handleClick("/")}>
          /
        </div>
        <div className="btn seven" onClick={() => handleClick("7")}>
          7
        </div>
        <div className="btn eight" onClick={() => handleClick("8")}>
          8
        </div>
        <div className="btn nine" onClick={() => handleClick("9")}>
          9
        </div>
        <div
          className="btn multiply bg_orange"
          onClick={() => handleClick("X")}
        >
          X
        </div>
        <div className="btn four" onClick={() => handleClick("4")}>
          4
        </div>
        <div className="btn five" onClick={() => handleClick("5")}>
          5
        </div>
        <div className="btn six" onClick={() => handleClick("6")}>
          6
        </div>
        <div className="btn minus bg_orange" onClick={() => handleClick("-")}>
          -
        </div>
        <div className="btn one" onClick={() => handleClick("1")}>
          1
        </div>
        <div className="btn two" onClick={() => handleClick("2")}>
          2
        </div>
        <div className="btn three" onClick={() => handleClick("3")}>
          3
        </div>
        <div
          className={`${"btn"} ${"plus"} ${"bg_orange"}`}
          onClick={() => handleClick("+")}
        >
          +
        </div>
        <div className={`${"btn"} ${"zero"}`} onClick={() => handleClick("0")}>
          0
        </div>
        <div className={`${"btn"} ${"dot"}`} onClick={() => handleClick(".")}>
          .
        </div>
        <div className="btn equal bg_orange" onClick={() => handleClick("=")}>
          =
        </div>
      </div>
    </div>
  );
};
