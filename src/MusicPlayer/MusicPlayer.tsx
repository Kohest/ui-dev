import React, { useState, useRef, useEffect } from "react";
import unnamedImage from "../images/unnamed.jpg";
import "./MusicPlayer.css";

export interface Props {
  title: string;
  song: string;
  author: string;
  coverImage?: string;
}

export const MusicPlayer: React.FC<Props> = ({
  title,
  author,
  song,
  coverImage,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleSongEnd = () => {
      if (isRepeat) {
        seekTo(0);
        audio.play();
      } else {
        seekTo(0);
        setIsPlaying(false);
      }
    };

    audio.addEventListener("loadedmetadata", handleMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleSongEnd);
    return () => {
      audio.removeEventListener("loadedmetadata", handleMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [isRepeat, song]);
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };
  return (
    <div>
      <div className={"music_player"}>
        <div
          id={"song_img"}
          style={{
            backgroundImage: `url(${coverImage ? coverImage : unnamedImage})`,
            animation: isPlaying
              ? "rotation 5s linear infinite backwards"
              : "none",
          }}
        />
        <h1>{title}</h1>
        <p>{author}</p>
        <audio ref={audioRef}>
          <source src={song} type="audio/mpeg" />
        </audio>
        <input
          id={"progress"}
          type="range"
          value={currentTime}
          max={duration}
          onChange={(e) => seekTo(Number(e.target.value))}
        />
        <div className={"controls"}>
          <div className={"move_backwards"} onClick={() => seekTo(0)}>
            <svg
              className={"svg_icon"}
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="backward"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-320c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3l0 41.7 0 41.7L459.5 440.6zM256 352l0-96 0-128 0-32c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-64z"
              ></path>
            </svg>
          </div>
          <div className={"play_btn"} onClick={togglePlayPause}>
            {isPlaying ? (
              <svg
                className={"svg_icon"}
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="pause"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                id="ctrl-icon"
              >
                <path
                  fill="currentColor"
                  d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"
                ></path>
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className={"svg_icon"}
                focusable="false"
                data-prefix="fas"
                data-icon="play"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                id="ctrl-icon"
              >
                <path
                  fill="currentColor"
                  d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                ></path>
              </svg>
            )}
          </div>
          <div className={"move_forward"} onClick={() => seekTo(duration)}>
            <svg
              className={"svg_icon"}
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="forward"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416L0 96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3l0 41.7 0 41.7L52.5 440.6zM256 352l0-96 0-128 0-32c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29l0-64z"
              ></path>
            </svg>
          </div>
        </div>
        <div className={"settings"}>
          <div className={"volume"}>
            <div
              className={"volume_btn"}
              onClick={() => setVolume(volume === 0 ? 1 : 0)}
            >
              {volume === 0 ? (
                <svg
                  className={"svg_icon"}
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="volume-xmark"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className={"svg_icon"}
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="volume-high"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"
                  ></path>
                </svg>
              )}
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className={"volume_slider"}
            />
          </div>
          <div>
            <div
              className={"repeat_btn" + " " + (isRepeat ? "repeat_active" : "")}
              onClick={() => setIsRepeat(!isRepeat)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                style={{ width: "20px", height: "20px" }}
              >
                <path d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96l160 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32l0 32L160 64C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96l-160 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 160 0c88.4 0 160-71.6 160-160z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
