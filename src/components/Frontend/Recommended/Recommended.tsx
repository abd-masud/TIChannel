import { Footer } from "../Footer/Footer";
import { Navigation } from "../Navigation/Navigation";
import { RecommendedContent } from "./RecommendedContent";

export const RecommendedPage = () => {
  return (
    <main className="bg-black">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <RecommendedContent />
      <Footer />
    </main>
  );
};
