import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";

const releaseItems = [
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
  {
    id: 1,
    title: "Title 1",
    category: "Category 1",
    duration: "1h 30m",
    imageSrc: "/images/image1.jpg",
  },
  {
    id: 2,
    title: "Title 2",
    category: "Category 2",
    duration: "2h 15m",
    imageSrc: "/images/image2.jpg",
  },
  {
    id: 3,
    title: "Title 3",
    category: "Category 3",
    duration: "1h 45m",
    imageSrc: "/images/image3.jpg",
  },
  {
    id: 4,
    title: "Title 4",
    category: "Category 4",
    duration: "1h 45m",
    imageSrc: "/images/image4.jpg",
  },
  {
    id: 5,
    title: "Title 5",
    category: "Category 5",
    duration: "1h 45m",
    imageSrc: "/images/image5.jpg",
  },
  {
    id: 6,
    title: "Title 6",
    category: "Category 6",
    duration: "1h 45m",
    imageSrc: "/images/image6.jpg",
  },
  {
    id: 7,
    title: "Title 7",
    category: "Category 7",
    duration: "1h 45m",
    imageSrc: "/images/image7.jpg",
  },
  {
    id: 8,
    title: "Title 8",
    category: "Category 8",
    duration: "1h 45m",
    imageSrc: "/images/image8.jpg",
  },
  {
    id: 9,
    title: "Title 9",
    category: "Category 9",
    duration: "1h 45m",
    imageSrc: "/images/image9.jpg",
  },
  {
    id: 1,
    title: "Title 1",
    category: "Category 1",
    duration: "1h 30m",
    imageSrc: "/images/image1.jpg",
  },
  {
    id: 2,
    title: "Title 2",
    category: "Category 2",
    duration: "2h 15m",
    imageSrc: "/images/image2.jpg",
  },
  {
    id: 3,
    title: "Title 3",
    category: "Category 3",
    duration: "1h 45m",
    imageSrc: "/images/image3.jpg",
  },
  {
    id: 4,
    title: "Title 4",
    category: "Category 4",
    duration: "1h 45m",
    imageSrc: "/images/image4.jpg",
  },
  {
    id: 5,
    title: "Title 5",
    category: "Category 5",
    duration: "1h 45m",
    imageSrc: "/images/image5.jpg",
  },
  {
    id: 6,
    title: "Title 6",
    category: "Category 6",
    duration: "1h 45m",
    imageSrc: "/images/image6.jpg",
  },
  {
    id: 7,
    title: "Title 7",
    category: "Category 7",
    duration: "1h 45m",
    imageSrc: "/images/image7.jpg",
  },
  {
    id: 8,
    title: "Title 8",
    category: "Category 8",
    duration: "1h 45m",
    imageSrc: "/images/image8.jpg",
  },
  {
    id: 9,
    title: "Title 9",
    category: "Category 9",
    duration: "1h 45m",
    imageSrc: "/images/image9.jpg",
  },
];

export const WatchLaterContent = () => {
  return (
    <main className="sm:px-12 px-4 pb-8 min-h-screen">
      <h2 className="text-white text-[20px] font-bold">Watch Later</h2>

      <div className="mt-4 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        {releaseItems.map((item) => (
          <Link
            key={item.id}
            className="relative group h-full group"
            href={`/new-release/${item.id}`}
          >
            <Image
              className="rounded"
              src={item.imageSrc}
              alt={item.title}
              width={500}
              height={300}
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
                {item.title}
              </p>
              <div className="sm:flex block gap-2 items-center opacity-0 group-hover:opacity-100 transition duration-300">
                <p className="text-white text-[14px]">{item.category}</p>
                <FontAwesomeIcon
                  className="h-1 w-1 text-white sm:block hidden"
                  icon={faCircle}
                />
                <p className="text-white text-[14px]">{item.duration}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};
