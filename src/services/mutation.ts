const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;


if (!GRAPHQL_ENDPOINT) {
  throw new Error("GRAPHQL endpoint is not defined in environment variables.");
}

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

export async function createTask({ task }: { task: Omit<Task, 'id' | 'createdAt' | "status">; }): Promise<Task> {
  const mutation = `
    mutation CreateTask($title: String!, $description: String!, $category: String!, $endDate: String!, $user: UserInput!) {
      createTask(title: $title, description: $description, category: $category, endDate: $endDate, user: $user ) {
        title
        description
        status
        category
        createdAt
        endDate
      }
    }
  `;
  const variables = {
    title: task.title,
    description: task.description,
    category: task.category,
    endDate: task.endDate,
    user: {
      firstName: task.user.firstName,
      lastName: task.user.lastName,
    }
  };

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const json = await response.json();
  return json.data.addTask;
}

export async function removeTask(id: string): Promise<void> {
  const mutation = `
    mutation RemoveTask($removeTaskId: String!) {
    removeTask(id: $removeTaskId) {
    id
    }
  }
  `;

  const variables = { removeTaskId: id };

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}