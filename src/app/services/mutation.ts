const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";
import { Task } from "@/app/components/global";

export async function updateTaskStatus(id: string, status: string) {
  const mutation = `
    mutation UpdateTaskStatus($id: String!, $status: String!) {
      updateTaskStatus(id: $id, status: $status) {
        id
        status
      }
    }
  `;

  const variables = { id, status };

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const json = await response.json();
  return json.data.updateTaskStatus;
}

export async function createTask({ task }: { task: Omit<Task, 'id' | 'createdAt'>; }) : Promise<Task> {
  const mutation = `
    mutation AddTask($task: TaskInput!) {
      addTask(task: $task) {
        title
        description
        status
        category
        createdAt
        endDate
      }
    }
  `;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: mutation, variables: { task } }),
  });

  const json = await response.json();
  return json.data.addTask;
  
}