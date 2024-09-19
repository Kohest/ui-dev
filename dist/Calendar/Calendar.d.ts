import React from "react";
import "./Calendar.css";
interface CalendarProps {
    lang?: "eng" | "rus";
    color?: string;
    size?: keyof typeof sizes;
}
declare enum sizes {
    small = "small",
    medium = "medium"
}
export declare const Calendar: React.FC<CalendarProps>;
export {};
