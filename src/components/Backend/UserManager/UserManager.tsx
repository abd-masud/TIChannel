import { Breadcrumb } from "./Breadcrumb";
import { UserManagerTable } from "./UserManagerTable";

export const UserManagerPage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <UserManagerTable />
    </main>
  );
};
