"use client";
import { useEffect, useRef, useState } from "react";
import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";
import video3 from "../../assets/video3.mp4";
import VideoCard from "@/components/Cards/VideoCard";
import Controls from "@/components/Control/Control";

export default function Home() {
  const videoRef = useRef(null);
  const playPercentRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [allVideos, setAllVideos] = useState([]);

  const [volume, setVolume] = useState(1);
  const [isPIP, setIsPIP] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentDuration, setCurrentDuration] = useState("00:00");
  const [totalDuration, setTotalDuration] = useState("00:00");

  const handleChangeVideo = (src) => {
    if (videoRef.current) {
      videoRef.current.src = src;

      // Call load() to reload the video with the new source
      videoRef.current.load();
    }
  };

  const getTotalDuration = () => {
    const time = formatDuration(videoRef?.current?.duration);
    setTotalDuration(time);
    setIsPlaying(true);
  };

  const getCurrentDuration = () => {
    const time = formatDuration(videoRef?.current?.currentTime);
    setCurrentDuration(time);

    const percentInFloat =
      videoRef?.current?.currentTime / videoRef?.current?.duration;
    const percent = percentInFloat * 100;
    playPercentRef.current.style.width = percent + "%";
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
    if (event) {
      event.stopPropagation();
    }

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
    if (event) {
      event.stopPropagation();
    }

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
    if (event) {
      event.stopPropagation();
    }
    const currentSpeed = videoRef.current.playbackRate;
    let newSpeed = currentSpeed + 0.25;
    if (currentSpeed === 2) newSpeed = 0.25;

    videoRef.current.playbackRate = newSpeed;
    setPlaybackSpeed(newSpeed);
  };

  const toggleFullScreen = (event) => {
    console.log("full screen");
    if (event) {
      event.stopPropagation();
    }

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
    if (event) {
      event.stopPropagation();
    }

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
    if (event) {
      event.stopPropagation();
    }

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

  const skipSeconds = (duration) => {
    videoRef.current.currentTime += duration;
  };

  useEffect(() => {
    // Function to handle key down events
    const handleKeyDown = (event) => {
      const pressedKey = event.key;
      console.log(pressedKey);

      if (pressedKey === " " || pressedKey === "k") {
        togglePlayPause();
      } else if (pressedKey === "m") {
        toggleMute();
      } else if (pressedKey === "f") {
        toggleFullScreen();
      } else if (pressedKey === "p") {
        togglePIP();
      } else if (pressedKey === "ArrowLeft" || pressedKey === "j") {
        skipSeconds(-5);
      } else if (pressedKey === "ArrowRight" || pressedKey === "l") {
        skipSeconds(5);
      }
    };

    // Add event listener to the document
    document.addEventListener("keydown", handleKeyDown);

    // Clean up function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setAllVideos([video1, video2, video3]);

    //At first time onLoadedData Event not working that's why again load video after render
    videoRef.current.load();
  }, []);

  return (
    <div className="flex flex-col  min-h-screen w-full bg-gradient-to-r from-violet-200 to-pink-200">
      <div className="h-[15vh] text-5xl text-gray-700 font-mono flex justify-center items-center font-semibold">
        Next Player
      </div>
      <div className="flex flex-col items-center gap-8 xl:flex-row | xl:h-[80vh] px-6">
        <div
          ref={videoContainerRef}
          className="relative group flex-1 md:flex-[0.7] h-full bg-black w-[95%] xl:w-full flex rounded-xl justify-center items-center"
          onClick={togglePlayPause}
        >
          <video
            ref={videoRef}
            controls={false}
            width="100%"
            autoPlay
            onLoadedData={getTotalDuration}
            onTimeUpdate={getCurrentDuration}
            height={isFullScreen ? "100vh" : "800"}
            className="rounded-md "
          >
            <source src={video1} type="video/mp4" />
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
            totalDuration={totalDuration}
            togglePlayPause={togglePlayPause}
            togglePlaybackSpeed={togglePlaybackSpeed}
            toggleFullScreen={toggleFullScreen}
            togglePIP={togglePIP}
            toggleMute={toggleMute}
            handleVolumeChange={handleVolumeChange}
          />
        </div>

        <div className="flex-[0.3] box-border px-4 h-full w-full">
          <div className=" px-4 pt-4 bg-white/50 rounded-sm h-full">
            <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-600 font-semibold pb-6 font-mono">
              Playlist
            </div>

            <div className="xl:max-h-[70vh] overflow-y-auto flex flex-col gap-4">
              {allVideos?.map((src, index) => {
                return (
                  <VideoCard
                    src={src}
                    number={index + 1}
                    handleChangeVideo={handleChangeVideo}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
