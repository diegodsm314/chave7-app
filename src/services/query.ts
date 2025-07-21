const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";

import { Task, Category } from "@/app/components/global";

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          tasks {
            id
            title
            description
            category
            endDate
            createdAt
            status
            user {
              firstName
              email
            }
          }
        }
      `
    }),
  });

  const json = await response.json();
  return json.data.tasks;
}

export function getTaskById(id: string): Promise<Task> {
  if (!id) {
    throw new Error("Task ID is required");
  }
  return fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query GetTask($id: String!) {
          task(id: $id) {
            id
            title
            description
            category
            endDate
            createdAt
            status
            user {
              firstName
              lastName
              email
            }
          }
        }
      `,
      variables: { id },
    }),
  })
  .then(response => response.json())
  .then(json => json.data.task);
}