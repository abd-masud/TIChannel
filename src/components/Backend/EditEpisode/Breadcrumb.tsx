"use client";

import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export const Breadcrumb: React.FC = () => {
  return (
    <>
      <main className="mb-4 pb-4 border-b flex justify-between items-center">
        <div>
          <p className="text-[16px] font-[600]">Edit Episode</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link className="text-[12px] text-[#797c8b]" href="/ti-admin">
                Dashboard
              </Link>
              <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
              <p className="text-[12px] text-[#797c8b]">Episode</p>
              <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
              <Link
                className="text-[12px] text-[#797c8b]"
                href="/ti-admin/episode/all-episode"
              >
                All Episode
              </Link>
              <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
              <p className="text-[12px] text-[#797c8b]">Edit Episode</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
