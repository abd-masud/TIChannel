import Image from "next/image";
import Link from "next/link";
import GooglePlay from "../../../../public/images/google-play.png";
import ApplePlay from "../../../../public/images/apple-play.png";
import {
  faFacebookF,
  faYoutube,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => {
  return (
    <main className="bg-[#171717] divide-[#27272A] divide-y border-t-2 border-[#C11119]">
      <div className="grid md:grid-cols-3 grid-cols-1 divide-y md:divide-y-0 divide-[#27272A]">
        <div className="col-span-2 grid grid-cols-2">
          <div className="text-white font-[600] text-[14px] flex flex-col justify-center items-center py-5">
            <p className="mb-2">CALL US</p>
            <p>01521583066</p>
          </div>
          <div className="text-white font-[600] text-[14px] flex flex-col justify-center items-center py-5">
            <p className="mb-2">FOLLOW US</p>
            <div className="flex justify-center items-center gap-3">
              <Link href={""}>
                <FontAwesomeIcon
                  className="h-5 w-5 text-gray-300"
                  icon={faFacebookF}
                />
              </Link>
              <Link href={""}>
                <FontAwesomeIcon
                  className="h-5 w-5 text-gray-300"
                  icon={faYoutube}
                />
              </Link>
              <Link href={""}>
                <FontAwesomeIcon
                  className="h-5 w-5 text-gray-300"
                  icon={faInstagram}
                />
              </Link>
              <Link href={""}>
                <FontAwesomeIcon
                  className="h-5 w-5 text-gray-300"
                  icon={faTiktok}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-white font-[600] text-[14px] flex flex-col justify-center items-center py-5">
          <p className="mb-2">DOWNLOAD APP</p>
          <div className="flex">
            <Link href={""}>
              <Image
                className="w-[100px] h-[30px] mr-2"
                src={GooglePlay}
                alt={""}
              />
            </Link>
            <Link href={""}>
              <Image className="w-[100px] h-[30px]" src={ApplePlay} alt={""} />
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center text-[14px] text-[#71717A] font-[500] py-5">
        © 2024 All Rights Reserved by TI Channel.
      </p>
    </main>
  );
};
