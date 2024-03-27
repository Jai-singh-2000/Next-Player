"use client";
import video from "../../assets/telegram.mp4";

export default function Home() {
  return (
    <div className="flex justify-center items-center bg-slate-100 h-[100svh]">
      <video controls width="750">
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
