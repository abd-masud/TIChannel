"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "../Navigation/Navigation";
import {
  faAngleLeft,
  faDesktop,
  faCircleXmark,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const initialDevices = [
  { id: 1, icon: faDesktop, name: "Chrome browser" },
  { id: 2, icon: faMobileScreenButton, name: "iPhone Xs" },
  { id: 3, icon: faMobileScreenButton, name: "Google Pixel 6a" },
  { id: 4, icon: faMobileScreenButton, name: "Unknown Device" },
];

export const DevicePage = () => {
  const [devices, setDevices] = useState(initialDevices);

  const handleDelete = (id: number) => {
    setDevices((prevDevices) =>
      prevDevices.filter((device) => device.id !== id)
    );
  };

  return (
    <main className="bg-auth_bg bg-cover bg-center bg-fixed w-screen h-screen">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <div className="flex justify-center items-center w-screen h-[calc(100vh-85px)]">
        <div className="w-[500px] bg-[#66636342] backdrop-blur-lg sm:px-10 px-8 sm:py-14 py-12 mx-5">
          <h1 className="text-white font-[700] text-[20px] mb-5">
            Transaction History
          </h1>
          <div
            style={{
              scrollbarWidth: "none",
            }}
            className="flex flex-col rounded-lg bg-black bg-opacity-30 border border-[#45484d] py-5 max-h-[calc(100vh-350px)] overflow-y-auto"
          >
            <style jsx>{`
              ::-webkit-scrollbar {
                width: 0;
              }
              ::-webkit-scrollbar-track {
                background: transparent;
              }
              ::-webkit-scrollbar-thumb {
                background: transparent;
              }
            `}</style>
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between px-4 py-4 border border-[#45484d] mx-2"
              >
                <p className="text-white text-[16px]">
                  <FontAwesomeIcon
                    className="sm:w-20 w-10 -ml-4"
                    icon={device.icon}
                  />
                  {device.name}
                </p>
                <button
                  onClick={() => handleDelete(device.id)}
                  className="text-primary"
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </div>
            ))}
          </div>
          <Link
            className="text-red-600 inline-flex items-center text-[14px] font-[500] mt-4"
            href={"/user"}
          >
            <FontAwesomeIcon
              className="h-3 w-3 mr-2 mt-[2px]"
              icon={faAngleLeft}
            />
            Back
          </Link>
        </div>
      </div>
    </main>
  );
};
