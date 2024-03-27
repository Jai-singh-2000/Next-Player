"use client";
import { useRef, useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  DesktopIcon,
  LaptopIcon,
} from "@radix-ui/react-icons";
import video from "../../assets/telegram.mp4";

export default function Home() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPIP, setIsPIP] = useState(false);

  const togglePlayPause = () => {
    if (videoRef?.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullScreen = () => {
    if (document?.fullscreenElement === null) {
      videoRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const togglePIP = () => {
    if (!document?.pictureInPictureElement) {
      videoRef.current.requestPictureInPicture();
      setIsPIP(true);
    } else {
      document.exitPictureInPicture();
      setIsPIP(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-slate-800 to-gray-700 ">
      <div className="relative group max-h-[100svh]" onClick={togglePlayPause}>
        <video
          ref={videoRef}
          controls={false}
          width="500"
          height="300"
          className="rounded-md pointer-events-none"
        >
          <source src={video} type="video/mp4" />
        </video>
        <Controls
          isPIP={isPIP}
          isPlaying={isPlaying}
          isFullScreen={isFullScreen}
          togglePlayPause={togglePlayPause}
          toggleFullScreen={toggleFullScreen}
          togglePIP={togglePIP}
        />
      </div>
    </div>
  );
}

const Controls = ({
  isPIP,
  isPlaying,
  isFullScreen,
  toggleFullScreen,
  togglePlayPause,
  togglePIP,
}) => {
  return (
    <div
      className={`py-3 w-full px-3 flex justify-between absolute  bottom-0  group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-75 ease-in-out delay-75  bg-black/20 z-50 
      ${isFullScreen && "fixed w-full h-full"} ${isPlaying && "opacity-0"}`}
    >
      <div onClick={togglePlayPause} className="cursor-pointer">
        {isPlaying ? (
          <PauseIcon color="white" width={24} height={24} />
        ) : (
          <PlayIcon color="white" width={24} height={24} />
        )}
      </div>

      <div className="flex gap-4">
        <div onClick={togglePIP} className="cursor-pointer">
          {isPIP ? (
            <DesktopIcon color="white" width={24} height={24} />
          ) : (
            <LaptopIcon color="white" width={24} height={24} />
          )}
        </div>

        <div onClick={toggleFullScreen} className="cursor-pointer">
          {isFullScreen ? (
            <ExitFullScreenIcon color="white" width={24} height={24} />
          ) : (
            <EnterFullScreenIcon color="white" width={24} height={24} />
          )}
        </div>
      </div>
    </div>
  );
};
