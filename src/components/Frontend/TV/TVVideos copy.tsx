"use client";

import { faTv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "@videojs/http-streaming";
import "video.js/dist/video-js.css";
import overlay from "videojs-overlay";

declare global {
  interface ScreenOrientation {
    lock?: (orientation: "portrait" | "landscape") => Promise<void>;
    unlock: () => void;
  }
}

if (videojs.getPlugin("overlay") === undefined) {
  videojs.registerPlugin("overlay", overlay);
}

export const TVVideos: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<typeof videojs.players | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (videoRef.current) {
        playerRef.current = videojs(videoRef.current, {
          controls: true,
          autoplay: false,
          preload: "auto",
          poster: "/images/poster.jpg",
          responsive: true,
          fluid: true,
          sources: [
            {
              src: "videos/video.mp4",
              type: "video/mp4",
            },
          ],
        });

        playerRef.current.ready(() => {
          playerRef.current.overlay({
            overlays: [
              {
                content:
                  "<a href='/subscribe' class='custom-overlay'>You are using free subscription. Please choose a plan</a>",
                start: 5,
                align: "top-right",
                className: "top-right-overlay",
              },
            ],
          });
        });

        const handleFullscreenChange = () => {
          if (document.fullscreenElement) {
            if (window.innerWidth < 640 && "orientation" in screen) {
              screen.orientation.lock?.("landscape").catch((error) => {
                console.warn("Orientation lock failed:", error);
              });
            }
          } else {
            screen.orientation.unlock?.();
          }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
          document.removeEventListener(
            "fullscreenchange",
            handleFullscreenChange
          );
        };
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <div className="xl:px-20 sm:px-4 px-0">
        <div className="">
          <div className="max-w-screen-lg m-auto">
            <div
              data-vjs-player
              className="relative pb-[56.25%] max-w-screen-lg m-auto"
            >
              <video
                ref={videoRef}
                className="video-js absolute top-0 left-0 w-full rounded lg:mb-0 mb-5"
                controls
              />
            </div>
            <div className="bg-gray-900">
              <button className="text-white bg-gray-700 hover:bg-[#C11119] m-2 px-5 py-1 rounded transition duration-300">
                {" "}
                <FontAwesomeIcon className="h-4 w-4 mr-2" icon={faTv} />
                Server 1
              </button>
              <button className="text-white bg-gray-700 hover:bg-[#C11119] m-2 px-5 py-1 rounded transition duration-300">
                {" "}
                <FontAwesomeIcon className="h-4 w-4 mr-2" icon={faTv} />
                Server 2
              </button>
              <button className="text-white bg-gray-700 hover:bg-[#C11119] m-2 px-5 py-1 rounded transition duration-300">
                {" "}
                <FontAwesomeIcon className="h-4 w-4 mr-2" icon={faTv} />
                Server 3
              </button>
              <button className="text-white bg-primary hover:bg-[#a70e15] m-2 px-5 py-1 rounded transition duration-300">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
