"use client";

import { useState } from "react";
import Link from "next/link";

import { RiLiveFill } from "react-icons/ri";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdMovieEdit } from "react-icons/md";
import { IoIosTv } from "react-icons/io";

export const Card = () => {
  const [totalSeries] = useState(20);
  const [unpublishedSeries] = useState(180);
  const [liveShows] = useState(200);

  return (
    <main className="grid md:grid-cols-3 grid-cols-1 gap-4">
      <div className="bg-white p-[14px] rounded shadow-md border">
        <div className="flex justify-between mb-3">
          <h2 className="text-[#797c8b] font-[500] text-[16px]">
            TOTAl SERIES
          </h2>
          <Link
            className="bg-[#ffeff0] h-6 w-6 flex justify-center items-center rounded"
            href={"/ti-admin"}
          >
            <FaLongArrowAltRight className="text-[12px] text-primary " />
          </Link>
        </div>
        <hr />
        <div className="flex justify-between items-center mt-6">
          <div>
            <h2 className="text-[36px] text-[#181c32] font-bold">
              {totalSeries}
            </h2>
            <p className="text-[#797c8b] text-[14px]">Videos</p>
          </div>
          <div className="bg-[#ffeff0] p-3 rounded-lg">
            <RiLiveFill className="text-[40px] text-primary " />
          </div>
        </div>
      </div>
      <div className="bg-white p-[14px] rounded shadow-md border">
        <div className="flex justify-between mb-3">
          <h2 className="text-[#797c8b] font-[500] text-[16px]">
            UNPUBLISHED SERIES
          </h2>
          <Link
            className="bg-[#ffeff0] h-6 w-6 flex justify-center items-center rounded"
            href={"/ti-admin"}
          >
            <FaLongArrowAltRight className="text-[12px] text-primary " />
          </Link>
        </div>
        <hr />
        <div className="flex justify-between items-center mt-6">
          <div>
            <h2 className="text-[36px] text-[#181c32] font-bold">
              {unpublishedSeries}
            </h2>
            <p className="text-[#797c8b] text-[14px]">Videos</p>
          </div>
          <div className="bg-[#ffeff0] p-3 rounded-lg">
            <MdMovieEdit className="text-[40px] text-primary " />
          </div>
        </div>
      </div>
      <div className="bg-white p-[14px] rounded shadow-md border">
        <div className="flex justify-between mb-3">
          <h2 className="text-[#797c8b] font-[500] text-[16px]">
            LIVE TV SHOWS
          </h2>
          <Link
            className="bg-[#ffeff0] h-6 w-6 flex justify-center items-center rounded"
            href={"/ti-admin"}
          >
            <FaLongArrowAltRight className="text-[12px] text-primary " />
          </Link>
        </div>
        <hr />
        <div className="flex justify-between items-center mt-6">
          <div>
            <h2 className="text-[36px] text-[#181c32] font-bold">
              {liveShows}
            </h2>
            <p className="text-[#797c8b] text-[14px]">Videos</p>
          </div>
          <div className="bg-[#ffeff0] p-3 rounded-lg">
            <IoIosTv className="text-[40px] text-primary" />
          </div>
        </div>
      </div>
    </main>
  );
};
