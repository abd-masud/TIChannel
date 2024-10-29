import { Breadcrumb } from "./Breadcrumb";
import { AllSeriesTable } from "./AllSeriesTable";

export const AllSeriesPage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <AllSeriesTable />
    </main>
  );
};
