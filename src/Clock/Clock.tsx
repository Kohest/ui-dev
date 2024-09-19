import React, { useEffect, useState } from "react";
import "./Clock.css";
interface Props {
  width?: string;
  height?: string;
  fontSize?: string;
  shapeHeight?: string;
  shapeWidth?: string;
  clockWidth?: string;
}
const formatTime = (time: number): string =>
  time < 10 ? `0${time}` : `${time}`;
export const Clock: React.FC<Props> = ({
  width,
  height,
  fontSize,
  shapeHeight,
  shapeWidth,
  clockWidth,
}) => {
  const [time, setTime] = useState({
    hours: formatTime(new Date().getHours()),
    minutes: formatTime(new Date().getMinutes()),
    seconds: formatTime(new Date().getSeconds()),
  });
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime({
        hours: formatTime(now.getHours()),
        minutes: formatTime(now.getMinutes()),
        seconds: formatTime(now.getSeconds()),
      });
    };
    const interval = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={"clock_container"}
      style={
        {
          width: width,
          height: height,
          "--shape-width": shapeWidth || "180px",
          "--shape-height": shapeHeight || "180px",
        } as React.CSSProperties
      }
    >
      <div className="clock" style={{ fontSize: fontSize }}>
        <span id="hours" style={{ width: clockWidth }}>
          {time.hours}
        </span>
        <span style={{ width: clockWidth }}>:</span>
        <span id="minutes" style={{ width: clockWidth }}>
          {time.minutes}
        </span>
        <span style={{ width: clockWidth }}>:</span>
        <span id="seconds" style={{ width: clockWidth }}>
          {time.seconds}
        </span>
      </div>
    </div>
  );
};
