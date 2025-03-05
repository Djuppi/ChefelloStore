// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../types";

export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    getBasket: builder.query<Product[], void>({
      query: () => `basket`,
      providesTags: ["Basket"],
    }),
    postBasket: builder.mutation<Product[], Product[]>({
      query: (data) => ({
        url: "basket",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Basket"],
    }),
    addToBasket: builder.mutation<Product[], Product>({
      query: (data) => ({
        url: "basket/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Basket"],
    }),
    removeFromBasket: builder.mutation<Product[], Product["productId"]>({
      query: (id) => ({
        url: `basket/remove/`,
        method: "DELETE",
        body: { productId: id },
      }),
      invalidatesTags: ["Basket"],
    }),
  }),
});

export const { usePostBasketMutation, useAddToBasketMutation, useRemoveFromBasketMutation, useGetBasketQuery } = basketApi;
