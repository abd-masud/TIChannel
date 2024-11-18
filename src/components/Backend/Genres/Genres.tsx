"use client";

import { Breadcrumb } from "./Breadcrumb";
import { GenresTable } from "./GenresTable";
import { useState } from "react";

export const GenresPage = () => {
  const [refreshData, setRefreshData] = useState(false);

  const handleDataRefresh = () => {
    setRefreshData((prev) => !prev);
  };

  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb onAddGenres={handleDataRefresh} />
      <GenresTable refreshData={refreshData} />
    </main>
  );
};
