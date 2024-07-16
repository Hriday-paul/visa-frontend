import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

const apiUrl = import.meta.env.VITE_API_URL as string;

const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: [],
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: (builder) => ({
        createUser: builder.mutation<void, { email: string; first_name: string; last_name: string; username: string, phone_no : string, password : string, confirm_password : string }>({
            query: ({ email, first_name, last_name, username, phone_no, password, confirm_password }) => ({
                url: `/register/`,
                method: 'POST',
                body: { email, first_name, last_name, username, password, confirm_password }
            }),
            // invalidatesTags: []
        }),
        loginUser: builder.mutation<void, { email: string; username: string, password : string}>({
            query: ({ email, username, password }) => ({
                url: `/login/`,
                method: 'POST',
                body: { username, password }
            }),
            // invalidatesTags: []
        }),
    })
})

export const {useCreateUserMutation, useLoginUserMutation} = baseApi;

export const reduxApi = baseApi;
export default baseApi;

