"use client";
import { useState } from "react";
import HeaderComponent from "../header/headerComponent";
import TaskList from "./taskList";

export default function TaskPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div>
      <HeaderComponent search={search} setSearch={setSearch} category={category} setCategory={setCategory} />
      <TaskList search={search} category={category} />
    </div>
  );
}