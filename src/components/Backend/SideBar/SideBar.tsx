"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AiFillDashboard } from "react-icons/ai";
import { SiSteelseries } from "react-icons/si";
import { MdLiveTv } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { SiCircleci } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaList } from "react-icons/fa";

export const SideBar = () => {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSubMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const closeSubmenu = () => {
    setOpenSection(null);
  };

  const linkClass = (route: string) =>
    `text-[13px] text-[#797c8b] hover:text-white font-[500] flex items-center transition duration-300 group h-11 border-t border-[#252D37] ${
      pathname === route ? "text-white bg-[#1E2639]" : ""
    }`;

  const subLinkClass = (route: string) =>
    `text-[13px] text-[#797c8b] hover:text-white font-[500] flex items-center transition duration-300 group h-11 ${
      pathname === route ? "text-white" : ""
    }`;

  const linkBar = (route: string) =>
    `bg-primary h-[23px] w-[3px] group-hover:opacity-100 opacity-0 transition duration-300 ${
      pathname === route ? "opacity-100" : ""
    }`;

  return (
    <main className="bg-[#171F29] h-screen">
      <p className="text-white font-bold text-[30px] px-8 py-3">
        <span className="text-primary">TI</span> Channel
      </p>
      <Link
        href={"/ti-admin"}
        className={linkClass("/ti-admin")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/ti-admin")}></div>
        <AiFillDashboard className="ml-[21px] text-[16px] mr-3 w-5" />
        Dashboard
      </Link>

      <button
        onClick={() => toggleSection("series")}
        className={`text-[13px] text-[#797c8b] hover:text-white font-[500] flex items-center transition duration-300 group h-11 w-full border-t border-[#252D37] ${
          pathname.includes("/ti-admin/series") ? "text-white bg-[#1E2639]" : ""
        }`}
      >
        <div className="bg-primary h-[23px] w-[3px] group-hover:opacity-100 opacity-0 transition duration-300"></div>
        <SiSteelseries className="ml-[21px] text-[16px] mr-3 w-5" />
        Series
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 transform ${
          openSection === "series"
            ? "max-h-[90px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-[50px] bg-[#1D1B31] text-[13px]">
          <Link
            className={subLinkClass("/ti-admin/series/add-series")}
            href="/ti-admin/series/add-series"
            onClick={handleSubMenuClick}
          >
            <FaPlus className="text-[16px] mr-3 w-5" />
            Add Series
          </Link>

          <Link
            className={subLinkClass("/ti-admin/series/all-series")}
            href="/ti-admin/series/all-series"
            onClick={handleSubMenuClick}
          >
            <FaList className="text-[16px] mr-3 w-5" />
            All Series
          </Link>
        </div>
      </div>

      <button
        onClick={() => toggleSection("tv")}
        className={`text-[13px] text-[#797c8b] hover:text-white font-[500] flex items-center transition duration-300 group h-11 w-full border-t border-[#252D37] ${
          pathname.includes("/ti-admin/tv") ? "text-white bg-[#1E2639]" : ""
        }`}
      >
        <div className="bg-primary h-[23px] w-[3px] group-hover:opacity-100 opacity-0 transition duration-300"></div>
        <MdLiveTv className="ml-[21px] text-[16px] mr-3 w-5" />
        Live TV
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 transform ${
          openSection === "tv"
            ? "max-h-[90px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-[50px] bg-[#1D1B31] text-[13px]">
          <Link
            className={subLinkClass("/ti-admin/tv/add-channel")}
            href="/ti-admin/tv/add-channel"
            onClick={handleSubMenuClick}
          >
            <FaPlus className="text-[16px] mr-3 w-5" />
            Add Channel
          </Link>

          <Link
            className={subLinkClass("/ti-admin/tv/all-channel")}
            href="/ti-admin/tv/all-channel"
            onClick={handleSubMenuClick}
          >
            <FaList className="text-[16px] mr-3 w-5" />
            All Channel
          </Link>
        </div>
      </div>

      <Link
        href={"/ti-admin/genres"}
        className={linkClass("/ti-admin/genres")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/ti-admin/genres")}></div>
        <BiSolidDashboard className="ml-[21px] text-[16px] mr-3 w-5" />
        Genres
      </Link>
      <Link
        href={"/ti-admin/live-tv-genres"}
        className={linkClass("/ti-admin/live-tv-genres")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/ti-admin/live-tv-genres")}></div>
        <SiCircleci className="ml-[21px] text-[16px] mr-3 w-5" />
        Live TV Genres
      </Link>
      <Link
        href={"/ti-admin/user-manager"}
        className={linkClass("/ti-admin/user-manager")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/ti-admin/user-manager")}></div>
        <FaUser className="ml-[21px] text-[16px] mr-3 w-5" />
        User Manager
      </Link>

      <button
        onClick={() => toggleSection("settings")}
        className={`text-[13px] text-[#797c8b] hover:text-white font-[500] flex items-center transition duration-300 group h-11 w-full border-t border-[#252D37] ${
          pathname.includes("/ti-admin/settings")
            ? "text-white bg-[#1E2639]"
            : ""
        }`}
      >
        <div className="bg-primary h-[23px] w-[3px] group-hover:opacity-100 opacity-0 transition duration-300"></div>
        <FaGear className="ml-[21px] text-[16px] mr-3 w-5" />
        Settings
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 transform ${
          openSection === "settings"
            ? "max-h-[90px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-[56px] bg-[#1D1B31] text-[13px]">
          <Link
            className={subLinkClass("/terms-conditions")}
            href="/ti-admin/terms-conditions"
            onClick={handleSubMenuClick}
          >
            Terms & Conditions
          </Link>

          <Link
            className={subLinkClass("/privacy-policy")}
            href="/ti-admin/privacy-policy"
            onClick={handleSubMenuClick}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
};
