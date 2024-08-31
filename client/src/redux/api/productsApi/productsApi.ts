import { api } from '../api';

// Define a service using a base URL and expected endpoints
export const productsApi = api.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getProduct: builder.query({
      query: id => `/products/${id}`,
    }),
    postReview: builder.mutation({
      // the rule is query accepts only one parameter
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    getReview: builder.query({
      query: id => `/reviews/${id}`,
      providesTags: ['reviews'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  usePostReviewMutation,
  useGetReviewQuery,
} = productsApi;
