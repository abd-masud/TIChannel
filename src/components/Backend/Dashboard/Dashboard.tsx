import { Breadcrumb } from "./Breadcrumb";
import { Card } from "./Card";
import { Viewed } from "./Viewed";
import { Series } from "./Series";
import { Users } from "./Users";

export const DashboardPage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <Card />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <Viewed />
        <Series />
      </div>
      <Users />
    </main>
  );
};
