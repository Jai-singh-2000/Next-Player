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
  const videoContainerRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [isPIP, setIsPIP] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const playPercentRef = useRef(null);
  const [currentDuration, setCurrentDuration] = useState("00:00");

  const getTotalDuration = () => {
    const time = formatDuration(videoRef?.current?.duration);
    console.log(time, "total time");
  };

  const getCurrentDuration = () => {
    const time = formatDuration(videoRef?.current?.currentTime);
    setCurrentDuration(time);

    const percentInFloat =
      videoRef?.current?.currentTime / videoRef?.current?.duration;
    const percent = percentInFloat * 100;
    playPercentRef.current.style.width = percent + "%";
    // setplayPercentRef()
  };

  const formatDuration = (time) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    if (hours === 0) {
      return `${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
    } else {
      return `${hours < 10 ? "0" : ""}${hours}:${
        minutes < 10 ? "0" : ""
      }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  };

  const handleVolumeChange = (event) => {
    console.log("volume change");
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
    console.log("play pause");
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

  const togglePlaybackSpeed = (event) => {
    event.stopPropagation();
    const currentSpeed = videoRef.current.playbackRate;
    let newSpeed = currentSpeed + 0.25;
    if (currentSpeed === 2) newSpeed = 0.25;

    videoRef.current.playbackRate = newSpeed;
    setPlaybackSpeed(newSpeed);
  };

  const toggleFullScreen = (event) => {
    console.log("full screen");
    event.stopPropagation();

    // If the video is not in full screen mode then request for full screen. Otherwise, exit it.
    if (document?.fullscreenElement === null) {
      videoContainerRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const togglePIP = (event) => {
    console.log("pip");
    event.stopPropagation();

    // If video is not in picture in picture mode then request for it. Otherwise, exit it.
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

    // If video is muted then unmute it and vice versa.
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);

    // If video is muted, set volume to 0. Otherwise, set it to the current volume.
    if (videoRef.current.muted) {
      setVolume(0);
    } else {
      setVolume(videoRef?.current?.volume);
    }
  };

  return (
    <div className="flex justify-center items-center bg-slate-300 ">
      <div
        ref={videoContainerRef}
        className="relative group max-h-[100svh] max-w-[1000px] bg-black w-full flex justify-center"
        onClick={togglePlayPause}
      >
        <video
          ref={videoRef}
          controls={false}
          width="100%"
          onLoadedDataCapture={getTotalDuration}
          onTimeUpdate={getCurrentDuration}
          height={isFullScreen ? "100vh" : "800"}
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
          playPercentRef={playPercentRef}
          playbackSpeed={playbackSpeed}
          currentDuration={currentDuration}
          togglePlayPause={togglePlayPause}
          togglePlaybackSpeed={togglePlaybackSpeed}
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
  playPercentRef,
  isFullScreen,
  playbackSpeed,
  currentDuration,
  toggleFullScreen,
  togglePlaybackSpeed,
  togglePlayPause,
  togglePIP,
  toggleMute,
  handleVolumeChange,
}) => {
  return (
    <div
      className={`flex flex-col justify-betweenpt-2 w-full absolute bottom-0 left-0 right-0  group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-75 ease-in-out delay-75 bg-black/10 z-50 py-2
    ${isPlaying && "opacity-0"}`}
    >
      <div className="w-full bg-black/10 absolute h-32 -top-20" />

      <div className="relative group z-50 w-full">
        <div
          className={`w-full h-[6px] group-hover:py-1 bg-[#aea8a8] absolute top-0`}
        />
        <div
          ref={playPercentRef}
          className={`  h-[6px] group-hover:py-1 bg-[#ff0000] z-50 absolute top-0`}
        />
      </div>
      <div className={`py-4 w-full px-3 flex justify-between z-50`}>
        <div className="flex gap-4">
          <div onClick={togglePlayPause} className="cursor-pointer">
            {isPlaying ? (
              <PauseIcon color="white" width={24} height={24} />
            ) : (
              <PlayIcon color="white" width={24} height={24} />
            )}
          </div>

          <div className="cursor-pointer flex">
            {isMuted || volume === 0 ? (
              <SpeakerOffIcon
                onClick={toggleMute}
                color="white"
                width={24}
                height={24}
              />
            ) : volume > 0.8 ? (
              <SpeakerLoudIcon
                onClick={toggleMute}
                color="white"
                width={24}
                height={24}
              />
            ) : volume > 0.4 ? (
              <SpeakerModerateIcon
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

          <div className="flex gap-2 text-xl text-white">
            <div>{currentDuration || "00:00"}</div>/<div>01:00</div>
          </div>
        </div>

        <div className="flex gap-4">
          <div
            onClick={togglePlaybackSpeed}
            className="cursor-pointer text-white text-xl"
          >
            {playbackSpeed}x
          </div>

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
    </div>
  );
};
