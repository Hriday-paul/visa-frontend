import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

const apiUrl = import.meta.env.VITE_API_URL as string;

const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: [],
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: (builder) => ({
        createUser: builder.mutation<void, { email: string; fname: string; lname: string; userName: string, phone : string, password : string, confirmPassword : string }>({
            query: ({ email, fname, lname, userName, phone, password, confirmPassword }) => ({
                url: `/createUser`,
                method: 'POST',
                body: { email, fname, lname, userName, phone, password, confirmPassword }
            }),
            // invalidatesTags: []
        }),
    })
})

export const {useCreateUserMutation} = baseApi;

export const reduxApi = baseApi;
export default baseApi;

