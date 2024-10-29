import { Footer } from "../Footer/Footer";
import { Navigation } from "../Navigation/Navigation";
import { HolyQuran } from "./HolyQuran";
import { NewArrival } from "./NewArrival";
import { Recommended } from "./Recommended";
import { Trending } from "./Trending";

export const IndexPage = () => {
  return (
    <main className="">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <NewArrival />
      <HolyQuran />
      <Trending />
      <Recommended />
      <Footer />
    </main>
  );
};
