import { Navigation } from "../Navigation/Navigation";
import { SubscribePlan } from "./SubscribePlan";

export const SubscribePage = () => {
  return (
    <main className="bg-black">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <SubscribePlan />
    </main>
  );
};
