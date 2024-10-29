import { Footer } from "../Footer/Footer";
import { Navigation } from "../Navigation/Navigation";
import { NewReleaseContent } from "./NewReleaseContent";

export const NewReleasePage = () => {
  return (
    <main className="bg-black">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <NewReleaseContent />
      <Footer />
    </main>
  );
};
