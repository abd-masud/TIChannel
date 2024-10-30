"use client";

import { faCircle, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import newArrival from "../../../../public/images/image1.jpg";
import Link from "next/link";
import { RelatedVideos } from "./RelatedVideos";
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

export const PlayVideos: React.FC = () => {
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
                  "<div class='custom-overlay'>You are using free subscription. Please choose a plan</div>",
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
      <div className="grid xl:grid-cols-4 grid-cols-1 xl:gap-4 gap-0 xl:px-20 sm:px-4 px-0">
        <div className="col-span-3">
          <div data-vjs-player className="relative h-auto pb-[56.25%]">
            <video
              ref={videoRef}
              className="video-js absolute top-0 left-0 w-full rounded lg:mb-0 mb-5"
              controls
            />
          </div>

          <div className="flex flex-col gap-5 sm:pt-5 pt-0 pb-10 sm:px-0 px-4">
            <h1 className="text-white xl:text-[36px] text-[24px] font-bold leading-10">
              Greats of Islam - Al-Siddiq
            </h1>

            <p className="text-white flex items-center gap-1 font-[600]">
              2020
              <FontAwesomeIcon className="mx-1 h-1 w-1" icon={faCircle} />
              1 Season
              <FontAwesomeIcon className="mx-1 h-1 w-1" icon={faCircle} />
              2 Subtitles
              <FontAwesomeIcon className="mx-1 h-1 w-1" icon={faCircle} />
              S+
            </p>

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
            <p className="text-white flex items-center font-[600]">
              History
              <FontAwesomeIcon className="mx-3 h-1 w-1" icon={faCircle} />
              Islamic Documentary
            </p>
            <div>
              <button className="text-white font-[600] text-[14px] border hover:border-[#C11119] hover:bg-[#C11119] hover:text-white rounded-md px-2 py-1 mr-5 transition-all duration-300">
                + Add to Watch List
              </button>
              <button className="font-[600] text-[14px] bg-[#C11119] hover:bg-[#a70e15] text-white rounded-md px-2 py-1 transition-all duration-300">
                <FontAwesomeIcon className="h-3 w-3" icon={faShare} />
              </button>
            </div>
          </div>
          <div className="px-4 sm:px-0 mb-5">
            <RelatedVideos />
          </div>
        </div>
        <div className="">
          <button className="text-white border border-gray-600 rounded mb-4 px-10 mx-4 py-2">
            Season 1
          </button>
          <div className="">
            <Link
              className="grid grid-cols-5 bg-black hover:bg-gray-800 px-3 py-1 transition duration-300 mb-2 rounded w-full"
              href={"/play"}
            >
              <Image
                className="col-span-2 h-full w-full rounded-xl p-1"
                src={newArrival}
                alt={"Season 1"}
              />
              <div className="col-span-3 flex flex-col justify-center ml-2">
                <h3 className="text-white text-[14px] font-bold">Episode 1</h3>

                <p className="text-gray-400 text-[12px] line-clamp-2 my-2">
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

                <p className="text-white text-[12px] font-[600]">1h 30m</p>
              </div>
            </Link>
            <Link
              className="grid grid-cols-5 bg-black hover:bg-gray-800 px-3 py-1 transition duration-300 mb-2 rounded"
              href={"/play"}
            >
              <Image
                className="col-span-2 h-full w-full rounded-xl p-1"
                src={newArrival}
                alt={"Season 1"}
              />
              <div className="col-span-3 flex flex-col justify-center ml-2">
                <h3 className="text-white text-[14px] font-bold">Episode 2</h3>

                <p className="text-gray-400 text-[12px] line-clamp-2 my-2">
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

                <p className="text-white text-[12px] font-[600]">1h 30m</p>
              </div>
            </Link>
            <Link
              className="grid grid-cols-5 bg-black hover:bg-gray-800 px-3 py-1 transition duration-300 mb-2 rounded"
              href={"/play"}
            >
              <Image
                className="col-span-2 h-full w-full rounded-xl p-1"
                src={newArrival}
                alt={"Season 1"}
              />
              <div className="col-span-3 flex flex-col justify-center ml-2">
                <h3 className="text-white text-[14px] font-bold">Episode 3</h3>

                <p className="text-gray-400 text-[12px] line-clamp-2 my-2">
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

                <p className="text-white text-[12px] font-[600]">1h 30m</p>
              </div>
            </Link>
            <Link
              className="grid grid-cols-5 bg-black hover:bg-gray-800 px-3 py-1 transition duration-300 mb-2 rounded"
              href={"/play"}
            >
              <Image
                className="col-span-2 h-full w-full rounded-xl p-1"
                src={newArrival}
                alt={"Season 1"}
              />
              <div className="col-span-3 flex flex-col justify-center ml-2">
                <h3 className="text-white text-[14px] font-bold">Episode 4</h3>

                <p className="text-gray-400 text-[12px] line-clamp-2 my-2">
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

                <p className="text-white text-[12px] font-[600]">1h 30m</p>
              </div>
            </Link>
            <Link
              className="grid grid-cols-5 bg-black hover:bg-gray-800 px-3 py-1 transition duration-300 mb-2 rounded"
              href={"/play"}
            >
              <Image
                className="col-span-2 h-full w-full rounded-xl p-1"
                src={newArrival}
                alt={"Season 1"}
              />
              <div className="col-span-3 flex flex-col justify-center ml-2">
                <h3 className="text-white text-[14px] font-bold">Episode 5</h3>

                <p className="text-gray-400 text-[12px] line-clamp-2 my-2">
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

                <p className="text-white text-[12px] font-[600]">1h 30m</p>
              </div>
            </Link>
            <Link
              className="grid grid-cols-5 bg-black hover:bg-gray-800 px-3 py-1 transition duration-300 mb-2 rounded"
              href={"/play"}
            >
              <Image
                className="col-span-2 h-full w-full rounded-xl p-1"
                src={newArrival}
                alt={"Season 1"}
              />
              <div className="col-span-3 flex flex-col justify-center ml-2">
                <h3 className="text-white text-[14px] font-bold">Episode 6</h3>

                <p className="text-gray-400 text-[12px] line-clamp-2 my-2">
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

                <p className="text-white text-[12px] font-[600]">1h 30m</p>
              </div>
            </Link>
            <Link
              className="grid grid-cols-5 bg-black hover:bg-gray-800 px-3 py-1 transition duration-300 mb-2 rounded"
              href={"/play"}
            >
              <Image
                className="col-span-2 h-full w-full rounded-xl p-1"
                src={newArrival}
                alt={"Season 1"}
              />
              <div className="col-span-3 flex flex-col justify-center ml-2">
                <h3 className="text-white text-[14px] font-bold">Episode 7</h3>

                <p className="text-gray-400 text-[12px] line-clamp-2 my-2">
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

                <p className="text-white text-[12px] font-[600]">1h 30m</p>
              </div>
            </Link>
            <Link
              className="grid grid-cols-5 bg-black hover:bg-gray-800 px-3 py-1 transition duration-300 mb-2 rounded"
              href={"/play"}
            >
              <Image
                className="col-span-2 h-full w-full rounded-xl p-1"
                src={newArrival}
                alt={"Season 1"}
              />
              <div className="col-span-3 flex flex-col justify-center ml-2">
                <h3 className="text-white text-[14px] font-bold">Episode 8</h3>

                <p className="text-gray-400 text-[12px] line-clamp-2 my-2">
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

                <p className="text-white text-[12px] font-[600]">1h 30m</p>
              </div>
            </Link>
            <Link
              className="grid grid-cols-5 bg-black hover:bg-gray-800 px-3 py-1 transition duration-300 mb-2 rounded"
              href={"/play"}
            >
              <Image
                className="col-span-2 h-full w-full rounded-xl p-1"
                src={newArrival}
                alt={"Season 1"}
              />
              <div className="col-span-3 flex flex-col justify-center ml-2">
                <h3 className="text-white text-[14px] font-bold">Episode 9</h3>

                <p className="text-gray-400 text-[12px] line-clamp-2 my-2">
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

                <p className="text-white text-[12px] font-[600]">1h 30m</p>
              </div>
            </Link>
            <Link
              className="grid grid-cols-5 bg-black hover:bg-gray-800 px-3 py-1 transition duration-300 mb-2 rounded"
              href={"/play"}
            >
              <Image
                className="col-span-2 h-full w-full rounded-xl p-1"
                src={newArrival}
                alt={"Season 1"}
              />
              <div className="col-span-3 flex flex-col justify-center ml-2">
                <h3 className="text-white text-[14px] font-bold">Episode 10</h3>

                <p className="text-gray-400 text-[12px] line-clamp-2 my-2">
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

                <p className="text-white text-[12px] font-[600]">1h 30m</p>
              </div>
            </Link>
            <Link
              className="grid grid-cols-5 bg-black hover:bg-gray-800 px-3 py-1 transition duration-300 mb-2 rounded"
              href={"/play"}
            >
              <Image
                className="col-span-2 h-full w-full rounded-xl p-1"
                src={newArrival}
                alt={"Season 1"}
              />
              <div className="col-span-3 flex flex-col justify-center ml-2">
                <h3 className="text-white text-[14px] font-bold">Episode 9</h3>

                <p className="text-gray-400 text-[12px] line-clamp-2 my-2">
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

                <p className="text-white text-[12px] font-[600]">1h 30m</p>
              </div>
            </Link>
            <Link
              className="grid grid-cols-5 bg-black hover:bg-gray-800 px-3 py-1 transition duration-300 mb-2 rounded"
              href={"/play"}
            >
              <Image
                className="col-span-2 h-full w-full rounded-xl p-1"
                src={newArrival}
                alt={"Season 1"}
              />
              <div className="col-span-3 flex flex-col justify-center ml-2">
                <h3 className="text-white text-[14px] font-bold">Episode 10</h3>

                <p className="text-gray-400 text-[12px] line-clamp-2 my-2">
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

                <p className="text-white text-[12px] font-[600]">1h 30m</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
