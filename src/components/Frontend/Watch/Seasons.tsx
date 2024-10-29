import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";

const Season = [
  {
    id: 1,
    title: "Greats of Islam",
    category: "History",
    duration: "1h 30m",
    imageSrc: "/images/image1.jpg",
  },
  {
    id: 2,
    title: "Islamic Art",
    category: "Art & Culture",
    duration: "1h 15m",
    imageSrc: "/images/image2.jpg",
  },
];

export const Seasons = () => {
  return (
    <main className="sm:px-12 px-4 pb-8 -mt-[35px]">
      <h2 className="text-white text-[20px] font-bold">Seasons</h2>

      <div className="mt-4 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {Season.map((season) => (
          <Link
            key={season.id}
            className="relative group h-full"
            href={"/watch"}
          >
            <Image
              className="rounded"
              src={season.imageSrc}
              alt={season.title}
              width={400}
              height={225}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent rounded-b h-20 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="absolute top-0 h-full w-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
              <FontAwesomeIcon
                className="h-14 w-14 text-gray-300 sm:visible invisible"
                icon={faPlay}
              />
            </div>
            <div className="absolute bottom-2 left-4">
              <p className="text-white font-[500] lg:text-[20px] text-[14px] z-10 opacity-0 group-hover:opacity-100 transition duration-300">
                {season.title}
              </p>
              <div className="sm:flex block gap-2 items-center opacity-0 group-hover:opacity-100 transition duration-300">
                <p className="text-white text-[14px]">{season.category}</p>
                <FontAwesomeIcon
                  className="h-1 w-1 text-white sm:block hidden"
                  icon={faCircle}
                />
                <p className="text-white text-[14px]">{season.duration}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};
