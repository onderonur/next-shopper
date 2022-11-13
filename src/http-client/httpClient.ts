import { ApiRequestError } from '@src/error-handling/ErrorHandlingTypes';
import { HttpClientError } from '@src/http-client/HttpClientError';

async function handleResponse<Data>(response: Response) {
  if (response.ok) {
    const data = (await response.json()) as Data;
    return data;
  } else {
    const errorJson = (await response.json()) as ApiRequestError;

    throw new HttpClientError(
      errorJson.statusCode,
      errorJson.message ?? response.statusText,
    );
  }
}

export const httpClient = {
  post: async <Data>(url: string, body: object): Promise<Data> => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await handleResponse<Data>(response);
    return data;
  },
};
