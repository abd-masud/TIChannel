"use client";

import { Footer } from "../Footer/Footer";
import { Navigation } from "../Navigation/Navigation";
import { SeriesVideos } from "./SeriesVideos";

export const SeriesPage = () => {
  return (
    <main className="bg-black">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <SeriesVideos />
      <Footer />
    </main>
  );
};
