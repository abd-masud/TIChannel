import { Footer } from "../Footer/Footer";
import { Navigation } from "../Navigation/Navigation";
import { WatchLaterContent } from "./WatchLaterContent";

export const WatchLater = () => {
  return (
    <main className="bg-black">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <WatchLaterContent />
      <Footer />
    </main>
  );
};
