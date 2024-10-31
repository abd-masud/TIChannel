import { Breadcrumb } from "./Breadcrumb";
import { SeasonTable } from "./SeasonTable";

export const SeasonPage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <SeasonTable />
    </main>
  );
};
