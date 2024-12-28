async function handleResponse<Data>(response: Response) {
  if (response.ok) {
    const data = (await response.json()) as Data;
    return data;
  }

  throw new Error(response.statusText);
}

export const httpClient = {
  get: async (url: string | URL, options: RequestInit) => {
    const response = await fetch(url, options);
    const data = await handleResponse(response);
    return { data, headers: response.headers };
  },
};
