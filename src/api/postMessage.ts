export const postMessage = async (payload: {
  threadId: string;
  message: string;
}) => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to submit data");
  }

  return response.json();
};

const mock = {
  threadId: "1",
  answer: "test",
};
