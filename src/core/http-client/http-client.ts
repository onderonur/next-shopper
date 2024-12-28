async function handleResponse<Data = unknown>(response: Response) {
  if (!response.ok) throw new Error(response.statusText);
  if (!response.body) return null;
  const data = (await response.json()) as Data;
  return data;
}

export const httpClient = {
  get: async <Data = unknown>(url: string | URL, options?: RequestInit) => {
    const response = await fetch(url, options);
    const data = await handleResponse<Data>(response);
    return { data, headers: response.headers };
  },
};
