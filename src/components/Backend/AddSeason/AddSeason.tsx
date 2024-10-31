import { Breadcrumb } from "./Breadcrumb";
import { AddSeasonCompound } from "./AddSeasonCompound";

export const AddSeasonPage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <AddSeasonCompound />
    </main>
  );
};
