import React, { useEffect, useState } from "react";
import "./Calendar.css";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const rusDays = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];
const rusMonths = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

const formatDate = (
  date: Date,
  lang: "eng" | "rus"
): { day: string; date: string; month: string; year: number } => {
  const days = lang === "rus" ? rusDays : weekDays;
  const months = lang === "rus" ? rusMonths : allMonths;

  return {
    day: days[date.getDay()],
    date: date.getDate().toString().padStart(2, "0"),
    month: months[date.getMonth()],
    year: date.getFullYear(),
  };
};

interface CalendarProps {
  lang?: "eng" | "rus";
  color?: string;
  size?: keyof typeof sizes;
}
enum sizes {
  small = "small",
  medium = "medium",
}
export const Calendar: React.FC<CalendarProps> = ({
  lang = "eng",
  color = "#f84936",
  size = "medium",
}) => {
  const [dateInfo, setDateInfo] = useState({
    day: "",
    date: "",
    month: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    const today = new Date();
    setDateInfo(formatDate(today, lang));
  }, [lang]);

  return (
    <div
      className={"calendar"}
      style={{
        width: size === "small" ? "200px" : "300px",
        height: size === "small" ? "175px" : "250px",
        fontSize: size === "small" ? "16px" : "24px",
      }}
    >
      <div className={"left"}>
        <p
          id={"date"}
          style={{
            fontSize: size === "small" ? "70px" : "100px",
            lineHeight: size === "small" ? "60px" : "90px",
          }}
        >
          {dateInfo.date}
        </p>
        <p id={"day"}>{dateInfo.day}</p>
      </div>
      <div className={"right"} style={{ background: color }}>
        <p id={"month"}>{dateInfo.month}</p>
        <p id={"year"}>{dateInfo.year}</p>
      </div>
    </div>
  );
};
