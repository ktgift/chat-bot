export type GetMessagesResponse = {
  id: string;
  title: string;
  date: string;
};

export const getMessages = async (): Promise<GetMessagesResponse[]> => {
  // return mock; // comment this
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/message`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to get data");
  }
  const res = await response.json();
  return res.map((item: any) => {
    return {
      id: item.thread_id,
      title: item.messages,
      role: item.role,
    };
  });
};

export const mock = [
  { id: "1", title: "Chat with John", date: "2023-10-01" },
  { id: "2", title: "Project Discussion", date: "2023-10-02" },
  { id: "3", title: "Feedback Session", date: "2023-10-03" },
];
