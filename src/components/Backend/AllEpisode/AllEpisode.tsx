import { Breadcrumb } from "./Breadcrumb";
import { AllEpisodeTable } from "./AllEpisodeTable";

export const AllEpisodePage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <AllEpisodeTable />
    </main>
  );
};
