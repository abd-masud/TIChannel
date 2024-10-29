"use client";

import Image from "next/image";
import newArrival from "../../../../public/images/image1.jpg";
import { faCircle, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export const WatchNow = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <main className="relative -top-[85px] h-screen">
      <div className="relative group h-full w-full">
        <Image
          className="rounded lg:mb-0 mb-5 md:object-fill object-cover h-full w-full"
          src={newArrival}
          width={630}
          height={350}
          alt="New-Arrival"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent rounded-b h-[400px]"></div>
      <div className="absolute flex flex-col gap-5 bottom-10 sm:px-12 px-4">
        <h1 className="text-white text-[36px] font-bold leading-10">
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

        <p className="text-white font-[600]">Duration: 1h 30m</p>

        <div>
          <p
            className={`text-white max-w-screen-md ${
              isExpanded ? "" : "line-clamp-2"
            }`}
          >
            He is the companion of the Messenger of God, may God bless him and
            grant him peace, and his first successor. Al-Siddiq had unique
            personal characteristics. He was not only the first person to
            convert to Islam, but he also converted the great Companions. Every
            nation has its scholars and great personalities, and he is the first
            great person to succeed the Messenger of God. He was the friend, the
            advocate and the supporter: the companion Abu Bakr Al-Siddiq in this
            special documentary.
          </p>
          <button
            onClick={toggleExpanded}
            className="text-white hover:underline transition-all duration-300"
          >
            {isExpanded ? "See Less..." : "See More..."}
          </button>
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

        <div>
          <Link
            className="text-white bg-primary hover:bg-[#a70e15] font-[600] text-[14px] px-3 py-2 rounded text-center sm:inline-block block transition-all duration-300"
            href="/play"
          >
            Watch Season 1
          </Link>
        </div>
      </div>
    </main>
  );
};
