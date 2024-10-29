"use client";

import { Footer } from "../Footer/Footer";
import { Navigation } from "../Navigation/Navigation";
import { PlayVideos } from "./PlayVideos";

export const PlayPage = () => {
  return (
    <main className="bg-black">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <PlayVideos />
      <Footer />
    </main>
  );
};
