"use client";

import Link from "next/link";
import {
  faRightToBracket,
  faBolt,
  faBars,
  faTimes,
  faUser,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import TITV from "../../../../public/images/ti-tv.svg";
import Image from "next/image";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <main className="flex justify-between items-center backdrop-blur-lg bg-black bg-opacity-30 lg:px-12 px-4 lg:py-5 py-2">
      <div className="flex items-center">
        <Link className="text-[30px] font-bold text-white" href="/">
          <span className="text-primary">TI</span> Channel
        </Link>
      </div>

      <div className="lg:flex hidden justify-center items-center">
        <form className="hidden lg:block mr-5">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-full px-4 py-2 text-white border border-white hover:border-[#C11119] focus:border-[#C11119] bg-transparent focus:outline-none text-[12px] transition duration-300"
          />
        </form>
        <Link
          className="bg-black mr-3 text-[#EAB308] px-3 py-3 rounded-full border-[#1f2937] flex justify-center items-center transition duration-300"
          href={"/"}
        >
          <FontAwesomeIcon className="h-4 w-4" icon={faTv} />
        </Link>
        <Link
          className="text-[#EAB308] text-[14px] bg-black font-[600] rounded-full px-3 py-2 border border-[#1f2937] mr-5 flex justify-center items-center"
          href={"/subscribe"}
        >
          <FontAwesomeIcon className="h-3 w-3 mr-2" icon={faBolt} />
          Subscribe
        </Link>
        <Link
          className="text-white bg-primary hover:bg-[#a70e15] font-[600] text-[14px] px-3 py-2 rounded flex justify-center items-center mr-5 transition duration-300"
          href={"/authentication/login"}
        >
          <FontAwesomeIcon className="h-3 w-3 mr-2" icon={faRightToBracket} />
          Sign In
        </Link>
        <Link
          className="text-white bg-primary hover:bg-[#a70e15] px-3 py-3 rounded-full flex justify-center items-center transition duration-300"
          href={"/user"}
        >
          <FontAwesomeIcon className="h-4 w-4" icon={faUser} />
        </Link>
      </div>

      <div className="lg:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-white transition-transform duration-300 ease-in-out"
        >
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            className="h-5 w-5"
          />
        </button>
      </div>

      <div
        className={`absolute top-16 right-4 w-[170px] bg-black bg-opacity-90 backdrop-blur-lg rounded-lg p-4 flex flex-col lg:hidden transition-all duration-300 ease-in-out transform ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <form className="mb-3">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-full px-4 py-2 text-white border border-white hover:border-[#C11119] focus:border-[#C11119] bg-transparent focus:outline-none text-[12px] transition duration-300 w-full"
          />
        </form>

        <div className="flex justify-between items-center">
          <Link className="fill-[#EAB308] mb-3" href="/">
            <Image className="h-5 w-5" src={TITV} alt={"TV"} />
          </Link>

          <Link
            className="text-[#EAB308] text-[14px] bg-black font-[600] rounded-full px-3 py-2 border border-[#1f2937] flex justify-center items-center mb-3"
            href={"/subscribe"}
          >
            <FontAwesomeIcon className="h-3 w-3 mr-2" icon={faBolt} />
            Subscribe
          </Link>
        </div>

        <Link
          className="text-white bg-primary font-[600] text-[14px] px-3 py-2 rounded flex justify-center items-center mb-3"
          href={"/authentication/login"}
        >
          <FontAwesomeIcon className="h-3 w-3 mr-2" icon={faRightToBracket} />
          Sign In
        </Link>
        <Link
          className="text-white bg-primary hover:bg-[#a70e15] px-3 py-3 rounded-full flex justify-center items-center transition duration-300"
          href={"/user"}
        >
          <FontAwesomeIcon className="h-4 w-4" icon={faUser} />
        </Link>
      </div>
    </main>
  );
};
