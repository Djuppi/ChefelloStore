// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponse } from "../../types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, { page: number, limit: number }>({
      query: ({page = 1, limit = undefined}) => `products?page=${page}${limit ? `&limit=${limit}` : ""}`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
