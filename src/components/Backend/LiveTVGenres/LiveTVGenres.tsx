import { Breadcrumb } from "./Breadcrumb";
import { LiveTVGenresTable } from "./LiveTVGenresTable";

export const LiveTVGenresPage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <LiveTVGenresTable />
    </main>
  );
};
