"use client";

import Link from "next/link";
import { FaAngleRight, FaPlus } from "react-icons/fa";

export const Breadcrumb: React.FC = () => {
  return (
    <>
      <main className="mb-4 pb-4 border-b flex justify-between items-center">
        <div>
          <p className="text-[16px] font-[600]">All Channel</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link className="text-[12px] text-[#797c8b]" href="/">
                Dashboard
              </Link>
              <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
              <p className="text-[12px] text-[#797c8b]">Live TV</p>
              <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
              <p className="text-[12px] text-[#797c8b]">All Channel</p>
            </div>
          </div>
        </div>
        <Link
          className="bg-primary text-white transition duration-300 text-[13px] py-2 px-3 rounded ml-4"
          href={"/tv/add-channel"}
        >
          <FaPlus />
        </Link>
      </main>
    </>
  );
};
