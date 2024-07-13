import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiUrl = import.meta.env.VITE_API_URL as string;

const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: [],
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: (builder) => ({
        getChart: builder.query({
            query: () => '/chart'
            // providesTags: []
        })
    })
})

export const {useGetChartQuery} = baseApi
export default baseApi;

