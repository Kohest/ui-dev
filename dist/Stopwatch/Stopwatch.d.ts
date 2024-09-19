import React from "react";
import "./Stopwatch.css";
declare enum sizes {
    small = "small",
    medium = "medium"
}
interface Props {
    background?: string;
    size?: keyof typeof sizes;
}
export declare const Stopwatch: React.FC<Props>;
export {};
