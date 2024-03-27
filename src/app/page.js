"use client";
import { useRef, useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  DesktopIcon,
  LaptopIcon,
  SpeakerLoudIcon,
  SpeakerOffIcon,
  SpeakerQuietIcon,
  SpeakerModerateIcon,
} from "@radix-ui/react-icons";
import video from "../../assets/telegram.mp4";

export default function Home() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPIP, setIsPIP] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (event) => {
    // console.log("volume change", videoRef?.current?.volume);
    event.stopPropagation();
    let volumeLevel = event.target.value;
    setVolume(volumeLevel);
    videoRef.current.volume = event.target.value; // Set the volume level

    // If volume level is 0, set isMuted to true
    if (volumeLevel == 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const togglePlayPause = (event) => {
    // console.log("play pause", videoRef?.current?.volume);
    event.stopPropagation();
    // If video is paused then make it play and vice versa
    if (videoRef?.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullScreen = (event) => {
    console.log("full screen");
    event.stopPropagation();
    if (document?.fullscreenElement === null) {
      videoRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const togglePIP = (event) => {
    console.log("pip");
    event.stopPropagation();
    if (!document?.pictureInPictureElement) {
      videoRef.current.requestPictureInPicture();
      setIsPIP(true);
    } else {
      document.exitPictureInPicture();
      setIsPIP(false);
    }
  };

  const toggleMute = (event) => {
    console.log("mute");
    event.stopPropagation();
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);

    if (videoRef.current.muted) {
      setVolume(0);
    } else {
      setVolume(videoRef?.current?.volume);
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
          volume={volume}
          isPIP={isPIP}
          isMuted={isMuted}
          isPlaying={isPlaying}
          isFullScreen={isFullScreen}
          togglePlayPause={togglePlayPause}
          toggleFullScreen={toggleFullScreen}
          togglePIP={togglePIP}
          toggleMute={toggleMute}
          handleVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}

const Controls = ({
  volume,
  isPIP,
  isMuted,
  isPlaying,
  isFullScreen,
  toggleFullScreen,
  togglePlayPause,
  togglePIP,
  toggleMute,
  handleVolumeChange,
}) => {
  return (
    <div
      className={`py-3 w-full px-3 flex justify-between absolute bottom-0  group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-75 ease-in-out delay-75  bg-black/20 z-50
      ${isPlaying && "opacity-0"}`}
    >
      <div className="flex gap-4">
        <div onClick={togglePlayPause} className="cursor-pointer">
          {isPlaying ? (
            <PauseIcon color="white" width={24} height={24} />
          ) : (
            <PlayIcon color="white" width={24} height={24} />
          )}
        </div>

        <div className="cursor-pointer flex">
          {isMuted ? (
            <SpeakerOffIcon
              onClick={toggleMute}
              color="white"
              width={24}
              height={24}
            />
          ) : (
            <SpeakerQuietIcon
              onClick={toggleMute}
              color="white"
              width={24}
              height={24}
            />
          )}
        </div>
        <input
          name="points"
          type="range"
          id="points"
          step={"any"}
          min="0"
          max="1"
          className="z-50"
          value={volume}
          onChange={handleVolumeChange}
        />
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
