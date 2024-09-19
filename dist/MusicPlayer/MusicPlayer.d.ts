import React from "react";
import "./MusicPlayer.css";
export interface Props {
    title: string;
    song: string;
    author: string;
    coverImage?: string;
}
export declare const MusicPlayer: React.FC<Props>;
