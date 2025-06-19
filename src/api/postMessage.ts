export const postMessage = async (payload: {
  threadId: string;
  message: string;
}) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/message`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to submit data");
  }

  return await response.json();
};

const mock = {
  threadId: "1",
  answer: "test",
};
