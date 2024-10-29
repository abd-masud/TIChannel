import Link from "next/link";
import { Navigation } from "../Navigation/Navigation";
import Image from "next/image";
import newArrival from "../../../../public/images/dummy.jpg";
import {
  faBolt,
  faClock,
  faDesktop,
  faFingerprint,
  faRightFromBracket,
  faSwatchbook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UserPage = () => {
  return (
    <main className="bg-auth_bg bg-cover bg-center bg-fixed w-screen h-screen">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <div className="flex justify-center items-center w-screen h-[calc(100vh-85px)]">
        <div className="w-[500px] bg-[#66636342] backdrop-blur-lg sm:px-10 px-8 sm:py-14 py-12 mx-5">
          <h1 className="text-white font-[700] text-[20px] mb-5">
            User Account
          </h1>
          <div className="flex flex-col items-center rounded-lg bg-black bg-opacity-30 border border-[#45484d] py-5">
            <Image
              className="h-20 w-20 rounded-full"
              src={newArrival}
              height={80}
              width={80}
              alt={"User Account"}
            />
            <p className="text-white font-bold text-[18px] mt-5">
              Abdullah Al Masud
            </p>
            <p className="text-white text-[14px]">abdmasud.2000@gmail.com</p>
          </div>
          <div className="flex flex-col divide-y mt-5">
            <Link className="text-[#EAB308] py-4" href={"/subscribe"}>
              <FontAwesomeIcon
                className="sm:w-20 w-10 text-[16px]"
                icon={faBolt}
              />
              Go to Premium
            </Link>
            <Link className="text-white py-4" href={"/transaction"}>
              <FontAwesomeIcon
                className="sm:w-20 w-10 text-[16px]"
                icon={faClock}
              />
              Transaction History
            </Link>
            <Link className="text-white py-4" href={"/watch-later"}>
              <FontAwesomeIcon
                className="sm:w-20 w-10 text-[16px]"
                icon={faSwatchbook}
              />
              Watch Later
            </Link>
            <Link className="text-white py-4" href={"/device"}>
              <FontAwesomeIcon
                className="sm:w-20 w-10 text-[16px]"
                icon={faDesktop}
              />
              Device Management
            </Link>
            <Link className="text-white py-4" href={"/account"}>
              <FontAwesomeIcon
                className="sm:w-20 w-10 text-[16px]"
                icon={faFingerprint}
              />
              Account Management
            </Link>
            <Link className="text-white py-4" href={"/authentication/login"}>
              <FontAwesomeIcon
                className="sm:w-20 w-10 text-[16px]"
                icon={faRightFromBracket}
              />
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
