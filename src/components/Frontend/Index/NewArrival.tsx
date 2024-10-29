"use client";

import Image from "next/image";
import { faCircle, faInfo, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { NewRelease } from "./NewRelease";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";

const newArrival = [
  {
    id: 1,
    imageSrc: "/images/image1.jpg",
    title: "Greats of Islam - 1",
    year: 2020,
    season: "1 Season",
    subtitles: "2 Subtitles",
    rating: "S+",
    duration: "1h 30m",
    description:
      "He is the companion of the Messenger of God, may God bless him and grant him peace, and his first successor. Al-Siddiq had unique personal characteristics. He was not only the first person to convert to Islam, but he also converted the great Companions. Every nation has its scholars and great personalities, and he is the first great person to succeed the Messenger of God. He was the friend, the advocate and the supporter: the companion Abu Bakr Al-Siddiq in this special documentary.",
    genre: "History",
    type: "Islamic Documentary",
  },
  {
    id: 2,
    imageSrc: "/images/image2.jpg",
    title: "Greats of Islam - 2",
    year: 2020,
    season: "1 Season",
    subtitles: "2 Subtitles",
    rating: "S+",
    duration: "1h 30m",
    description:
      "He is the companion of the Messenger of God, may God bless him and grant him peace, and his first successor. Al-Siddiq had unique personal characteristics. He was not only the first person to convert to Islam, but he also converted the great Companions. Every nation has its scholars and great personalities, and he is the first great person to succeed the Messenger of God. He was the friend, the advocate and the supporter: the companion Abu Bakr Al-Siddiq in this special documentary.",
    genre: "History",
    type: "Islamic Documentary",
  },
  {
    id: 3,
    imageSrc: "/images/image3.jpg",
    title: "Greats of Islam - 3",
    year: 2020,
    season: "1 Season",
    subtitles: "2 Subtitles",
    rating: "S+",
    duration: "1h 30m",
    description:
      "He is the companion of the Messenger of God, may God bless him and grant him peace, and his first successor. Al-Siddiq had unique personal characteristics. He was not only the first person to convert to Islam, but he also converted the great Companions. Every nation has its scholars and great personalities, and he is the first great person to succeed the Messenger of God. He was the friend, the advocate and the supporter: the companion Abu Bakr Al-Siddiq in this special documentary.",
    genre: "History",
    type: "Islamic Documentary",
  },
  {
    id: 4,
    imageSrc: "/images/image4.jpg",
    title: "Greats of Islam - 4",
    year: 2020,
    season: "1 Season",
    subtitles: "2 Subtitles",
    rating: "S+",
    duration: "1h 30m",
    description:
      "He is the companion of the Messenger of God, may God bless him and grant him peace, and his first successor. Al-Siddiq had unique personal characteristics. He was not only the first person to convert to Islam, but he also converted the great Companions. Every nation has its scholars and great personalities, and he is the first great person to succeed the Messenger of God. He was the friend, the advocate and the supporter: the companion Abu Bakr Al-Siddiq in this special documentary.",
    genre: "History",
    type: "Islamic Documentary",
  },
  {
    id: 5,
    imageSrc: "/images/image5.jpg",
    title: "Greats of Islam - 5",
    year: 2020,
    season: "1 Season",
    subtitles: "2 Subtitles",
    rating: "S+",
    duration: "1h 30m",
    description:
      "He is the companion of the Messenger of God, may God bless him and grant him peace, and his first successor. Al-Siddiq had unique personal characteristics. He was not only the first person to convert to Islam, but he also converted the great Companions. Every nation has its scholars and great personalities, and he is the first great person to succeed the Messenger of God. He was the friend, the advocate and the supporter: the companion Abu Bakr Al-Siddiq in this special documentary.",
    genre: "History",
    type: "Islamic Documentary",
  },
];

export const NewArrival = () => {
  return (
    <main className="relative lg:-top-[85px] -top-[60px] h-screen max-w-screen bg-black">
      <Swiper
        modules={[Autoplay, EffectFade]}
        loop={true}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="h-screen"
      >
        {newArrival.map((item) => (
          <SwiperSlide key={item.id}>
            <div>
              <Image
                className="lg:mb-0 mb-5 md:object-fill object-cover h-screen w-full"
                src={item.imageSrc}
                width={630}
                height={350}
                alt={item.title}
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-black to-transparent rounded-b h-full z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent rounded-b h-[400px] z-10"></div>

              <div className="absolute flex flex-col gap-1 sm:gap-2 lg:bottom-96 bottom-60 sm:px-12 px-4 z-20">
                <h1 className="text-white text-[40px] sm:text-[50px] font-bold">
                  {item.title}
                </h1>

                <p className="text-white flex items-center gap-1 font-[600] mt-10">
                  {item.year}
                  <FontAwesomeIcon className="mx-1 h-1 w-1" icon={faCircle} />
                  {item.season}
                  <FontAwesomeIcon className="mx-1 h-1 w-1" icon={faCircle} />
                  {item.subtitles}
                  <FontAwesomeIcon className="mx-1 h-1 w-1" icon={faCircle} />
                  {item.rating}
                </p>

                <p className="text-white font-[600]">
                  Duration: {item.duration}
                </p>

                <p className="text-white flex items-center font-[600] mb-10">
                  {item.genre}
                  <FontAwesomeIcon className="mx-3 h-1 w-1" icon={faCircle} />
                  {item.type}
                </p>

                <div className="flex items-center">
                  <Link
                    className="text-white bg-primary hover:bg-[#a70e15] font-[600] text-[14px] px-10 py-2 rounded text-center sm:inline-block block transition-all duration-300"
                    href="/watch"
                  >
                    Watch Now
                  </Link>
                  <button className="bg-gray-400 hover:bg-gray-500 font-bold text-[21px] h-[37px] w-[37px] ml-5 rounded flex justify-center items-center transition duration-300">
                    <FontAwesomeIcon className="h-3 w-3" icon={faPlus} />
                  </button>
                  <button className="bg-gray-400 hover:bg-gray-500 h-[37px] w-[37px] ml-5 rounded flex justify-center items-center transition duration-300">
                    <FontAwesomeIcon className="mx-3 h-3 w-3" icon={faInfo} />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="sm:px-12 -mt-[200px] lg:-mt-[330px] px-4 relative z-20">
        <NewRelease />
      </div>
    </main>
  );
};
