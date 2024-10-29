"use client";

import { useState } from "react";
import Link from "next/link";

import { RiLiveFill } from "react-icons/ri";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdMovieEdit } from "react-icons/md";
import { IoIosTv } from "react-icons/io";

export const Card = () => {
  const [vacationCount] = useState(20);
  const [presentCount] = useState(180);
  const [totalCount] = useState(200);

  return (
    <main className="grid md:grid-cols-3 grid-cols-1 gap-4">
      <div className="bg-white p-[14px] rounded shadow-md border">
        <div className="flex justify-between mb-3">
          <h2 className="text-[#797c8b] font-[500] text-[16px]">
            TOTAl SERIES
          </h2>
          <Link
            className="bg-[#ffeff0] h-6 w-6 flex justify-center items-center rounded"
            href={"/leave"}
          >
            <FaLongArrowAltRight className="text-[12px] text-primary " />
          </Link>
        </div>
        <hr />
        <div className="flex justify-between items-center mt-6">
          <div>
            <h2 className="text-[36px] text-[#181c32] font-bold">
              {vacationCount}
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
            href={"/attendance"}
          >
            <FaLongArrowAltRight className="text-[12px] text-primary " />
          </Link>
        </div>
        <hr />
        <div className="flex justify-between items-center mt-6">
          <div>
            <h2 className="text-[36px] text-[#181c32] font-bold">
              {presentCount}
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
            href={"/employees"}
          >
            <FaLongArrowAltRight className="text-[12px] text-primary " />
          </Link>
        </div>
        <hr />
        <div className="flex justify-between items-center mt-6">
          <div>
            <h2 className="text-[36px] text-[#181c32] font-bold">
              {totalCount}
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
