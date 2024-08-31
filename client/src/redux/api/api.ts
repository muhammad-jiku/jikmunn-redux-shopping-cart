import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryArgs,
} from '@reduxjs/toolkit/query/react';

const customFetchBaseQuery =
  (baseQueryArgs: FetchBaseQueryArgs | undefined) =>
  async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    console.log('BaseQuery Args:', args); // Logs the arguments passed to baseQuery
    console.log('Request URL:', baseQueryArgs?.baseUrl);
    // console.log('Request Method:', args.method);
    // console.log('Request Body:', args.body);

    const result = await fetchBaseQuery(baseQueryArgs)(args, api, extraOptions);

    console.log('Response:', result);

    return result;
  };

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: customFetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
//   tagTypes: ['comments'],
//   endpoints: () => ({}),
// });

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  }),
  tagTypes: ['reviews'],
  endpoints: () => ({}),
});

// console.log(import.meta.env.VITE_API_URL);
