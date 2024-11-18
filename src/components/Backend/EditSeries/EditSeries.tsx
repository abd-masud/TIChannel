"use client";

import { Breadcrumb } from "./Breadcrumb";
import { EditSeriesCompound } from "./EditSeriesCompound";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SeriesData {
  id: string | null;
  title: string | null;
  description: string | null;
  genres: string[];
  release_date: string | null;
  trailer_url: string | null;
  custom_tag: string | null;
  thumbnail: string | null;
  poster: string | null;
  series_type: string | null;
}

export const EditSeriesPage = () => {
  const searchParams = useSearchParams();
  const [initialData, setInitialData] = useState<SeriesData | null>(null);

  useEffect(() => {
    const parsedGenres = searchParams.get("genres")
      ? JSON.parse(searchParams.get("genres") as string)
      : [];

    setInitialData({
      id: searchParams.get("id"),
      title: searchParams.get("title"),
      description: searchParams.get("description"),
      genres: parsedGenres,
      release_date: searchParams.get("release_date"),
      trailer_url: searchParams.get("trailer_url"),
      custom_tag: searchParams.get("custom_tag"),
      thumbnail: searchParams.get("thumbnail"),
      poster: searchParams.get("poster"),
      series_type: searchParams.get("series_type"),
    });
  }, [searchParams]);

  if (!initialData) {
    return <p>Loading...</p>;
  }

  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <EditSeriesCompound initialData={initialData} />
    </main>
  );
};
