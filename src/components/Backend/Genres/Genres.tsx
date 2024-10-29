import { Breadcrumb } from "./Breadcrumb";
import { GenresTable } from "./GenresTable";

export const GenresPage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <GenresTable />
    </main>
  );
};