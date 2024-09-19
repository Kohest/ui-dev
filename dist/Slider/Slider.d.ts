import React from "react";
import "./Slider.css";
declare enum Size {
    small = 300,
    medium = 600,
    large = 900
}
interface Props {
    images: string[];
    size?: keyof typeof Size;
}
export declare const Slider: React.FC<Props>;
export {};
