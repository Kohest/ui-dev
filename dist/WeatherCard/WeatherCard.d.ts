import React from "react";
import "./WeatherCard.css";
declare enum Colors {
    basic = "linear-gradient(135deg, #00feba, #5b548a)",
    black = "linear-gradient(135deg, #63746f, #1e1c27)",
    white = "linear-gradient(135deg, #c4d8d3, #716f79)"
}
interface Props {
    color?: keyof typeof Colors;
}
export declare const WeatherCard: React.FC<Props>;
export {};
