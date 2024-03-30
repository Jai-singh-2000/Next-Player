"use client";
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

const Controls = ({
    volume,
    isPIP,
    isMuted,
    isPlaying,
    playPercentRef,
    isFullScreen,
    playbackSpeed,
    currentDuration,
    totalDuration,
    toggleFullScreen,
    togglePlaybackSpeed,
    togglePlayPause,
    togglePIP,
    toggleMute,
    handleVolumeChange,
}) => {
    return (
        <div
            className={`flex flex-col justify-betweenpt-2 w-full absolute bottom-0 left-0 right-0  hover:opacity-100 focus-within:opacity-100 transition-all duration-75 ease-in-out delay-75 bg-black/50 z-50 pt-2 rounded-md
    ${isPlaying && "opacity-0"}`}
        >
            <div className="w-full" />

            {/* TimeLine Design */}
            <div className="relative group w-full z-50 flex items-center">
                <div className={`w-full h-[4px] bg-[#aea8a8] absolute`} />

                <div ref={playPercentRef} className={`h-[4px] bg-[#306dde] z-50`} />
                <div className="size-4 bg-[#306dde] rounded-full z-50 " />

                <div className="flex gap-2 text-white text-xs sm:text-md  absolute left-2 -bottom-4">
                    <div>{currentDuration}</div>
                </div>
                <div className="flex gap-2 text-white text-xs sm:text-md  absolute right-2 -bottom-4">
                    <div>{totalDuration}</div>
                </div>
            </div>

            {/* Controls Icons */}
            <div
                className={`py-6 w-full px-3 flex justify-between items-center z-50`}
            >
                <div className="flex items-center gap-4">
                    <div className="flex">
                        <div className="cursor-pointer flex peer">
                            {isMuted || volume === 0 ? (
                                <SpeakerOffIcon
                                    onClick={toggleMute}
                                    color="white"
                                    className="size-5 lg:size-5"
                                    width={18}
                                    height={18}
                                />
                            ) : volume > 0.8 ? (
                                <SpeakerLoudIcon
                                    onClick={toggleMute}
                                    color="white"
                                    className="size-5 lg:size-5"
                                    width={18}
                                    height={18}
                                />
                            ) : volume > 0.4 ? (
                                <SpeakerModerateIcon
                                    onClick={toggleMute}
                                    color="white"
                                    className="size-5 lg:size-5"
                                    width={18}
                                    height={18}
                                />
                            ) : (
                                <SpeakerQuietIcon
                                    onClick={toggleMute}
                                    color="white"
                                    className="size-5 lg:size-5"
                                    width={18}
                                    height={18}
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
                            className="z-50 hidden peer-hover:block hover:block"
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                    </div>

                    <div
                        onClick={togglePlaybackSpeed}
                        className="cursor-pointer text-white text-xs sm:text-md md:text-lg"
                    >
                        {playbackSpeed}x
                    </div>
                </div>

                <div onClick={togglePlayPause} className="cursor-pointer">
                    {isPlaying ? (
                        <PauseIcon
                            color="white"
                            className="size-5 lg:size-6"
                            width={18}
                            height={18}
                        />
                    ) : (
                        <PlayIcon
                            color="white"
                            className="size-5 lg:size-6"
                            width={18}
                            height={18}
                        />
                    )}
                </div>

                <div className="flex gap-4">
                    <div onClick={togglePIP} className="cursor-pointer">
                        {isPIP ? (
                            <DesktopIcon
                                color="white"
                                className="size-5 lg:size-5"
                                width={18}
                                height={18}
                            />
                        ) : (
                            <LaptopIcon
                                color="white"
                                className="size-5 lg:size-5"
                                width={18}
                                height={18}
                            />
                        )}
                    </div>

                    <div onClick={toggleFullScreen} className="cursor-pointer">
                        {isFullScreen ? (
                            <ExitFullScreenIcon
                                color="white"
                                className="size-5 lg:size-5"
                                width={18}
                                height={18}
                            />
                        ) : (
                            <EnterFullScreenIcon
                                color="white"
                                className="size-5 lg:size-5"
                                width={18}
                                height={18}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Controls