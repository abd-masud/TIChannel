import { Breadcrumb } from "./Breadcrumb";
import { AddChannelCompound } from "./AddChannelCompound";

export const AddChannelPage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <AddChannelCompound />
    </main>
  );
};
