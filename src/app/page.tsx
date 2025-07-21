"use client";

import TaskPage from "./components/task/taskPage";
import FooterComponent from "./components/footer/footer";
import CardNewTaskComponent from "./components/card/cardNewTaskComponent";
import { useState } from "react";

export default function Home() {
  const [filters, setFilters] = useState({ search: "", category: "" });
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-stretch">
          <TaskPage></TaskPage>
      </main>
      <FooterComponent />
    </div>
  );
}
