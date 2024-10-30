import { Breadcrumb } from "./Breadcrumb";
import { CategoryTable } from "./CategoryTable";

export const CategoryPage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <CategoryTable />
    </main>
  );
};
