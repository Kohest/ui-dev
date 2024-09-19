import React from "react";
import "./Notes.css";
declare enum sizes {
    small = "small",
    medium = "medium"
}
interface Props {
    size?: keyof typeof sizes;
    color?: keyof typeof Colors;
}
declare enum Colors {
    basic = "linear-gradient(135deg, #cf9aff, #95c0ff)",
    black = "linear-gradient(135deg, #63746f, #1e1c27)",
    white = "linear-gradient(135deg, #c4d8d3, #716f79)"
}
export declare const Notes: React.FC<Props>;
export {};
