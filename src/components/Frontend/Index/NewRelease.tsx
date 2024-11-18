// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//   faAngleRight,
//   faCircle,
//   faPlay,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";

// interface Release {
//   _id: string;
//   _thumbnail: string;
//   title: string;
//   genres: string;
//   release_date: string;
// }

// export const NewRelease = () => {
//   const [newReleases, setNewReleases] = useState<Release[]>([]);

//   useEffect(() => {
//     const fetchNewReleases = async () => {
//       try {
//         const response = await fetch("/api/series");
//         const data = await response.json();
//         if (data.success) {
//           setNewReleases(data.series);
//         } else {
//           console.error("Failed to fetch new releases");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchNewReleases();
//   }, []);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <main>
//       <header className="flex justify-between items-center mb-4">
//         <h2 className="text-white text-lg font-bold">New Release</h2>
//         <Link href="/new-release">
//           <FontAwesomeIcon className="h-5 w-5 text-white" icon={faAngleRight} />
//         </Link>
//       </header>

//       <Swiper
//         loop
//         spaceBetween={16}
//         slidesPerView={2}
//         autoHeight
//         breakpoints={{
//           640: { slidesPerView: 3 },
//           768: { slidesPerView: 4 },
//           1024: { slidesPerView: 5 },
//         }}
//         className="mt-4"
//       >
//         {newReleases.map((release) => (
//           <SwiperSlide
//             className="group hover:h-[300px] transition duration-300"
//             key={release._id}
//           >
//             <Link
//               href={`/series/${release._id}`}
//               className="relative block transition-transform duration-300 transform group-hover:scale-110"
//             >
//               <Image
//                 className="rounded-lg w-full object-cover h-full"
//                 src={release._thumbnail}
//                 alt={release.title}
//                 width={200}
//                 height={300}
//               />
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent rounded-b h-28 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <FontAwesomeIcon
//                   className="h-14 w-14 text-gray-300"
//                   icon={faPlay}
//                 />
//               </div>
//               <div className="absolute bottom-2 left-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
//                 <p className="text-white font-semibold text-sm lg:text-lg">
//                   {release.title}
//                 </p>
//                 <div className="flex items-center text-white text-xs space-x-2">
//                   <span>{release.genres}</span>
//                   <FontAwesomeIcon icon={faCircle} className="h-1 w-1" />
//                   <span>{formatDate(release.release_date)}</span>
//                 </div>
//               </div>
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </main>
//   );
// };
