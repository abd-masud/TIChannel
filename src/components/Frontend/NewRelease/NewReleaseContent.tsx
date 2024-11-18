"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";

interface Release {
  _id: string;
  _thumbnail: string;
  title: string;
  genres: string;
  release_date: string;
}

export const NewReleaseContent = () => {
  const [newReleases, setNewReleases] = useState<Release[]>([]);
  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await fetch("/api/series");
        const data = await response.json();
        if (data.success) {
          setNewReleases(data.series);
        } else {
          console.error("Failed to fetch new releases");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNewReleases();
  }, []);

  return (
    <main className="sm:px-12 px-4 pb-8 min-h-screen">
      <h2 className="text-white text-[20px] font-bold flex items-center gap-1">
        <Link
          className="text-white hover:text-[#C11119] transition duration-300 flex items-center gap-1"
          href={"/"}
        >
          <FaHome />
          Home
        </Link>{" "}
        / New Release
      </h2>

      <div className="mt-4 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        {newReleases.map((item) => (
          <Link
            key={item._id}
            className="relative group h-full group"
            href={`/series/${item._id}`}
          >
            <Image
              className="rounded"
              src={item._thumbnail}
              alt={item.title}
              width={500}
              height={300}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent rounded-b h-20 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="absolute top-0 h-full w-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
              <FontAwesomeIcon
                className="h-14 w-14 text-gray-300 sm:visible invisible"
                icon={faPlay}
              />
            </div>
            <div className="absolute bottom-2 left-4">
              <p className="text-white font-[500] lg:text-[20px] text-[14px] z-10 opacity-0 group-hover:opacity-100 transition duration-300">
                {item.title}
              </p>
              <div className="sm:flex block gap-2 items-center opacity-0 group-hover:opacity-100 transition duration-300">
                <p className="text-white text-[14px]">{item.genres}</p>
                <FontAwesomeIcon
                  className="h-1 w-1 text-white sm:block hidden"
                  icon={faCircle}
                />
                <p className="text-white text-[14px]">
                  {new Date(item.release_date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};
