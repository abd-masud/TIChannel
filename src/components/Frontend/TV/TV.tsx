"use client";

import { Footer } from "../Footer/Footer";
import { Navigation } from "../Navigation/Navigation";
import { TVVideos } from "./TVVideos";

export const TVPage = () => {
  return (
    <main className="bg-black">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <TVVideos />
      <Footer />
    </main>
  );
};
