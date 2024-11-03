import { Breadcrumb } from "./Breadcrumb";
import { AddEpisodeCompound } from "./AddEpisodeCompound";

export const AddEpisodePage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <AddEpisodeCompound />
    </main>
  );
};
