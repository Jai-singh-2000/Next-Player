"use client";
import { useRef, useState } from "react";
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons";
import video from "../../assets/telegram.mp4";

export default function Home() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (videoRef?.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className=" flex justify-center items-center bg-gradient-to-r from-slate-800 to-gray-700 h-[100svh]">
      <div className="relative" onClick={togglePlayPause}>
        <video ref={videoRef} width="500" height="300" className="rounded-md">
          <source src={video} type="video/mp4" />
        </video>

        <div className="absolute z-50 bottom-1 py-1 w-full px-3">
          <div onClick={togglePlayPause} className="cursor-pointer">
            {isPlaying ? (
              <PauseIcon color="white" width={16} />
            ) : (
              <PlayIcon color="white" width={16} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
