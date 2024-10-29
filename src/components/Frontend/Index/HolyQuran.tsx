import Link from "next/link";
import Quran from "../../../../public/images/Quran.webp";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

export const HolyQuran = () => {
  return (
    <main className="bg-quran_bg bg-cover bg-center bg-fixed -mt-[90px]">
      <div className="grid md:grid-cols-2 grid-cols-1 max-w-screen-lg m-auto mb-20 py-16 gap-10">
        <div className="flex flex-col gap-4 w-full justify-center px-5">
          <h2 className="text-white text-[30px] font-[600]">The Holy Quran</h2>
          <p className="text-white">
            Listen to the Holy Quran Recited in its Entirety
          </p>
          <Link
            className="bg-primary hover:bg-[#a70e15] text-white py-3 px-8 rounded w-[200px] flex items-center transition duration-300"
            href={"/"}
          >
            <FaPlay className="mr-5" />
            LISTEN NOW
          </Link>
        </div>
        <div className="w-full px-5">
          <Image src={Quran} alt={"Holy Quran"} />
        </div>
      </div>
    </main>
  );
};
