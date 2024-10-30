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
                // end: 10,
                align: "top-right",
                className: "top-right-overlay",
              },
              // {
              //   content:
              //     "<div class='custom-overlay'>Another overlay here!</div>",
              //   start: 15,
              //   end: 20,
              //   align: "bottom-right",
              //   className: "bottom-right-overlay",
              // },
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
              <button className="text-white bg-gray-700 hover:bg-[#C11119] m-2 px-5 py-1 rounded transition duration-300">
                Share
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5 sm:pt-5 pt-0 pb-10 sm:px-0 px-4 mt-10">
            <h1 className="text-white xl:text-[36px] text-[24px] font-bold leading-10">
              Greats of Islam - Al-Siddiq
            </h1>

            <div>
              <p className="text-white xl:text-[16px] text-[14px]">
                He is the companion of the Messenger of God, may God bless him
                and grant him peace, and his first successor. Al-Siddiq had
                unique personal characteristics. He was not only the first
                person to convert to Islam, but he also converted the great
                Companions. Every nation has its scholars and great
                personalities, and he is the first great person to succeed the
                Messenger of God. He was the friend, the advocate and the
                supporter: the companion Abu Bakr Al-Siddiq in this special
                documentary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
