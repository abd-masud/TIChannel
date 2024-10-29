import { Breadcrumb } from "./Breadcrumb";
import { AllChannelTable } from "./AllChannelTable";

export const AllChannelPage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <AllChannelTable />
    </main>
  );
};
