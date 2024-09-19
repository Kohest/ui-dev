import React, { useState } from "react";
import "./SecondCalculator.css";

export const SecondCalculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>("");

  const handleClick = (value: string) => {
    setDisplayValue((prevValue) => prevValue + value);
  };

  const clearDisplay = () => {
    setDisplayValue("");
  };

  const deleteLastChar = () => {
    setDisplayValue((prevValue) => prevValue.slice(0, -1));
  };

  const calculateResult = () => {
    try {
      if (/[^0-9+\-*/.]/.test(displayValue)) {
        setDisplayValue("");
        return;
      }
      if (/[+\-*/.]$/.test(displayValue)) {
        setDisplayValue("");
        return;
      }
      setDisplayValue((prevValue) => {
        const result = eval(prevValue);
        return isNaN(result) ? "Error" : result.toString();
      });
    } catch {
      setDisplayValue("Error");
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <input type="text" value={displayValue} readOnly />
      </div>
      <form>
        <input
          type="button"
          value="AC"
          onClick={clearDisplay}
          className="operator"
        />
        <input
          type="button"
          value="DE"
          onClick={deleteLastChar}
          className="operator"
        />
        <input
          type="button"
          value="."
          onClick={() => handleClick(".")}
          className="operator"
        />
        <input
          type="button"
          value="/"
          onClick={() => handleClick("/")}
          className="operator"
        />

        <input type="button" value="7" onClick={() => handleClick("7")} />
        <input type="button" value="8" onClick={() => handleClick("8")} />
        <input type="button" value="9" onClick={() => handleClick("9")} />
        <input
          type="button"
          value="*"
          onClick={() => handleClick("*")}
          className="operator"
        />

        <input type="button" value="4" onClick={() => handleClick("4")} />
        <input type="button" value="5" onClick={() => handleClick("5")} />
        <input type="button" value="6" onClick={() => handleClick("6")} />
        <input
          type="button"
          value="-"
          onClick={() => handleClick("-")}
          className="operator"
        />

        <input type="button" value="1" onClick={() => handleClick("1")} />
        <input type="button" value="2" onClick={() => handleClick("2")} />
        <input type="button" value="3" onClick={() => handleClick("3")} />
        <input
          type="button"
          value="+"
          onClick={() => handleClick("+")}
          className="operator"
        />

        <input type="button" value="00" onClick={() => handleClick("00")} />
        <input type="button" value="0" onClick={() => handleClick("0")} />
        <input
          type="button"
          value="="
          className="equal operator"
          onClick={calculateResult}
        />
      </form>
    </div>
  );
};
