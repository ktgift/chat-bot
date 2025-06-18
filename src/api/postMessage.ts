export const postMessage = async (payload: {
  threadId: string;
  question: string;
}) => {
  const url = "https://api.example.com/message";
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
