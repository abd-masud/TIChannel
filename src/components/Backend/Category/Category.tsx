"use client";

import { Breadcrumb } from "./Breadcrumb";
import { CategoryTable } from "./CategoryTable";
import { useState } from "react";

export const CategoryPage = () => {
  const [refreshData, setRefreshData] = useState(false);

  const handleDataRefresh = () => {
    setRefreshData((prev) => !prev);
  };

  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb onAddCategory={handleDataRefresh} />
      <CategoryTable refreshData={refreshData} />
    </main>
  );
};
