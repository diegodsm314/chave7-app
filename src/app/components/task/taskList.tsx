"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/app/services/query";
import CardComponent from "../card/cardComponent";
import { Task } from "../global";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <CardComponent
          key={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          category={task.category}
          endDate={new Date(task.endDate || task.createdAt)}
        />
      ))}
    </div>
  );
}