import { Breadcrumb } from "./Breadcrumb";
import { AddSeriesCompound } from "./AddSeriesCompound";

export const AddSeriesPage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <AddSeriesCompound />
    </main>
  );
};
