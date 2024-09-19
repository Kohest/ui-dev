import React, { useState, useRef, useEffect } from "react";
import "./Stopwatch.css";
import startIcon from "../images/stopwatch/start.png";
import resetIcon from "../images/stopwatch/reset.png";
import pauseIcon from "../images/stopwatch/pause.svg";
enum sizes {
  small = "small",
  medium = "medium",
}
interface Props {
  background?: string;
  size?: keyof typeof sizes;
}

export const Stopwatch: React.FC<Props> = ({ background, size }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (value: number) => (value < 10 ? `0${value}` : value);

  const startStopwatch = () => {
    if (!isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          let { hours, minutes, seconds } = prevTime;
          seconds++;

          if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
              minutes = 0;
              hours++;
            }
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current!);
    }
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    clearInterval(timerRef.current!);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setIsRunning(false);
  };

  return (
    <div
      className="stopwatch"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${background})`,
        width: size === "small" ? "300px" : "600px",
      }}
    >
      <h1
        id="displayTime"
        style={{ fontSize: size === "small" ? "3rem" : "64px" }}
      >
        {`${formatTime(time.hours)}:${formatTime(time.minutes)}:${formatTime(time.seconds)}`}
      </h1>
      <div className="buttons">
        <img
          style={{ width: size === "small" ? "40px" : "50px" }}
          src={isRunning ? pauseIcon : startIcon}
          alt={isRunning ? "pause" : "start"}
          id="startBtn"
          onClick={startStopwatch}
        />
        <img
          style={{ width: size === "small" ? "40px" : "50px" }}
          src={resetIcon}
          alt="reset"
          id="resetBtn"
          onClick={resetStopwatch}
        />
      </div>
    </div>
  );
};
