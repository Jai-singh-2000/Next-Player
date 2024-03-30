const VideoCard = ({ src, number = 1, handleChangeVideo }) => {
    return (
        <div
            className="w-full min-h-20 flex cursor-pointer rounded-md hover:bg-white"
            onClick={() => handleChangeVideo(src)}
        >
            <div className="flex-[0.3] bg-black  rounded-md">
                <video className="rounded-md pointer-events-none w-full h-full">
                    <source src={src} type="video/mp4" />
                </video>
            </div>
            <div className="flex-[0.7] font-medium p-2 flex flex-col justify-center pl-4">
                <div>Video{number}</div>
                <div>Mp4</div>
            </div>
        </div>
    );
};

export default VideoCard
