import { Breadcrumb } from "./Breadcrumb";
import { TermsConditionsCompound } from "./TermsConditionsCompound";

export const TermsConditionsPage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <TermsConditionsCompound />
    </main>
  );
};
