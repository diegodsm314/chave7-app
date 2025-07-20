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

export async function createTask({ task }: { task: Omit<Task, 'id' | 'createdAt' | "status">; }) : Promise<Task> {
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