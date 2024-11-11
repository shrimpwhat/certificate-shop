import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = import.meta.env.VITE_API_KEY;

type SaleParams = {
  name: string;
  phone: string;
  email: string;
  item: Item;
};

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://sycret.ru/service/api/api`,
  }),
  endpoints: (builder) => ({
    getOptions: builder.query<Item[], void>({
      query: () => `?ApiKey=${apiKey}&MethodName=OSGetGoodList`,
      transformResponse: (response: { data: Item[] }) => response.data,
    }),
    sale: builder.mutation<void, SaleParams>({
      query: (params) => {
        const formData = new FormData();
        formData.append("ApiKey", apiKey);
        formData.append("MethodName", "OSSale");
        formData.append("ClientName", params.name);
        formData.append("Phone", params.phone.slice(2));
        formData.append("Email", params.email);
        formData.append("Id", params.item.ID);
        formData.append("TableName", params.item.TABLENAME);
        formData.append("PrimaryKey", params.item.PRIMARYKEY);
        formData.append("Price", params.item.PRICE);
        formData.append("Summa", params.item.SUMMA);
        formData.append("PaymentTypeId", "2");
        formData.append("UseDelivery", "0");

        return {
          url: "",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useGetOptionsQuery, useSaleMutation } = api;
export default api;
