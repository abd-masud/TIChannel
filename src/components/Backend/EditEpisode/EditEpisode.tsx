"use client";

import { Breadcrumb } from "./Breadcrumb";
import { EditEpisodeCompound } from "./EditEpisodeCompound";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface EpisodeData {
  id: string | null;
  series: string | null;
  name: string | null;
  description: string | null;
  category: string | null;
  thumbnail: string | null;
  stream_link: string | null;
  token: string | null;
  status: string | null;
}

export const EditEpisodePage = () => {
  const searchParams = useSearchParams();
  const [initialData, setInitialData] = useState<EpisodeData | null>(null);

  useEffect(() => {
    setInitialData({
      id: searchParams.get("id"),
      series: searchParams.get("series"),
      name: searchParams.get("name"),
      description: searchParams.get("description"),
      category: searchParams.get("category"),
      thumbnail: searchParams.get("thumbnail"),
      stream_link: searchParams.get("stream_link"),
      token: searchParams.get("token"),
      status: searchParams.get("status"),
    });
  }, [searchParams]);

  if (!initialData) {
    return <p>Loading...</p>;
  }

  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <EditEpisodeCompound initialData={initialData} />
    </main>
  );
};
