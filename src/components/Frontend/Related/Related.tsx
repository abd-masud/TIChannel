import { Footer } from "../Footer/Footer";
import { Navigation } from "../Navigation/Navigation";
import { RelatedContent } from "./RelatedContent";

export const RelatedPage = () => {
  return (
    <main className="bg-black">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <RelatedContent />
      <Footer />
    </main>
  );
};
