"use client";

import Image from "next/image";
import {
  faCircle,
  faInfo,
  faPlus,
  faAngleRight,
  faPlay,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, EffectFade } from "swiper/modules";
import { useEffect, useState } from "react";

interface NewArrivalType {
  custom_tag: string;
  description: string;
  genres: string;
  release_date: string;
  series_type: string;
  title: string;
  trailer_url: string;
  _id: string;
  _poster: string;
  _thumbnail: string;
}

export const NewArrival = () => {
  const [newArrival, setNewArrival] = useState<NewArrivalType[]>([]);

  useEffect(() => {
    const fetchNewArrival = async () => {
      try {
        const response = await fetch("/api/series");
        const data = await response.json();
        if (data.success) {
          setNewArrival(data.series);
        } else {
          console.error("Failed to fetch new releases");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNewArrival();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="relative lg:-top-[85px] -top-[60px] h-screen max-w-screen bg-black">
      <Swiper
        modules={[Autoplay, EffectFade]}
        loop
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
          <SwiperSlide key={item._id}>
            <div>
              <Image
                className="lg:mb-0 mb-5 md:object-fill object-cover h-screen w-full"
                src={item._thumbnail}
                width={630}
                height={350}
                alt={item.title}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-black to-transparent rounded-b h-full z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent rounded-b h-[400px] z-10"></div>

              <div className="absolute flex flex-col gap-1 sm:gap-2 2xl:bottom-[360px] xl:bottom-[310px] lg:bottom-[270px] md:bottom-[260px] sm:bottom-[260px] bottom-[230px] sm:px-12 px-4 z-20">
                <h1 className="text-white text-[40px] sm:text-[50px] font-bold animate-slideDown leading-[50px]">
                  {item.title}
                </h1>

                <div className="flex items-center my-5">
                  <p className="text-white flex items-center gap-1 font-[600]">
                    {item.genres}
                    <FontAwesomeIcon className="mx-1 h-1 w-1" icon={faCircle} />
                  </p>

                  <p className="text-white flex items-center font-[600] ml-1">
                    {formatDate(item.release_date)}
                    <FontAwesomeIcon className="mx-3 h-1 w-1" icon={faCircle} />
                  </p>
                </div>

                <div className="flex items-center">
                  <Link
                    className="text-white bg-primary hover:bg-[#a70e15] font-[600] text-[14px] px-10 py-2 rounded text-center sm:inline-block block transition-all duration-300 cursor-pointer"
                    href={`/series/${item._id}`}
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

      <div className="sm:px-12 2xl:bottom-[310px] xl:bottom-[280px] lg:bottom-[240px] md:bottom-[230px] sm:bottom-[230px] bottom-[200px] px-4 relative z-20">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-bold">New Release</h2>
          <Link href="/new-release">
            <FontAwesomeIcon
              className="h-5 w-5 text-white"
              icon={faAngleRight}
            />
          </Link>
        </header>

        <div className="relative">
          <button className="custom-prev-button-newRelease absolute z-10 left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white h-8 w-8 rounded-full hover:bg-opacity-75 transition">
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button className="custom-next-button-newRelease absolute z-10 right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white h-8 w-8 rounded-full hover:bg-opacity-75 transition">
            <FontAwesomeIcon icon={faAngleRight} />
          </button>

          <Swiper
            loop
            spaceBetween={16}
            slidesPerView={2}
            autoHeight={true}
            navigation={{
              prevEl: ".custom-prev-button-newRelease",
              nextEl: ".custom-next-button-newRelease",
            }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="mt-4"
          >
            {newArrival.map((release) => (
              <SwiperSlide
                className="group h-200 hover:h-[300px] transition duration-300"
                key={release._id}
              >
                <Link
                  href={`/series/${release._id}`}
                  className="relative block transition-transform duration-300 transform"
                >
                  <Image
                    className="rounded-lg w-full object-cover h-full"
                    src={release._thumbnail}
                    alt={release.title}
                    width={200}
                    height={300}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent rounded-b h-28 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FontAwesomeIcon
                      className="h-14 w-14 text-gray-300"
                      icon={faPlay}
                    />
                  </div>
                  <div className="absolute bottom-2 left-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <p className="text-white font-semibold text-sm lg:text-lg">
                      {release.title}
                    </p>
                    <div className="flex items-center text-white text-xs space-x-2">
                      <span>{release.genres}</span>
                      <FontAwesomeIcon icon={faCircle} className="h-1 w-1" />
                      <span>{formatDate(release.release_date)}</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </main>
  );
};
