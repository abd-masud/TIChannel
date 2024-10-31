import { Breadcrumb } from "./Breadcrumb";
import { EditSeriesCompound } from "./EditSeriesCompound";

export const EditSeriesPage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <EditSeriesCompound />
    </main>
  );
};
