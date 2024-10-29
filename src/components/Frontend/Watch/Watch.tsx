import { Footer } from "../Footer/Footer";
import { Navigation } from "../Navigation/Navigation";
import { Seasons } from "./Seasons";
import { WatchNow } from "./WatchNow";

export const WatchPage = () => {
  return (
    <main className="bg-black">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <WatchNow />
      <Seasons />
      <Footer />
    </main>
  );
};
