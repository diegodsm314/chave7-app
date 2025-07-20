const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";

export async function getTasks(category?: string, take: number = 10) {
  const query = `
    query GetTasks($category: String, $take: Int) {
      tasks(category: $category, take: $take) {
        id
        title
        description
        status
        category
        createdAt
        endDate
        user {
          firstName
          lastName
          email
        }
      }
    }
  `;

  const variables = { category, take };

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await response.json();
  console.log("GraphQL Response:", json);
  return json.data.tasks;
}