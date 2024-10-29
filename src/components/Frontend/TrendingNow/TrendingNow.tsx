import { Footer } from "../Footer/Footer";
import { Navigation } from "../Navigation/Navigation";
import { TrendingNowContent } from "./TrendingNowContent";

export const TrendingNowPage = () => {
  return (
    <main className="bg-black">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <TrendingNowContent />
      <Footer />
    </main>
  );
};
