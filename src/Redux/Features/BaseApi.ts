import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

const apiUrl = import.meta.env.VITE_API_URL as string;

const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: [],
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: (builder) => ({
        createUser: builder.mutation<void, { email: string; first_name: string; last_name: string; username: string, phone_no: string, password: string, confirm_password: string }>({
            query: ({ email, first_name, last_name, username, phone_no, password, confirm_password }) => ({
                url: `/account/register/`,
                method: 'POST',
                body: { email, first_name, last_name, username, password, password2: confirm_password, phone_no }
            }),
            // invalidatesTags: []
        }),
        verifyUser: builder.mutation<{ email: string; first_name: string; last_name: string; username: string, phone_no: string, message : string }, { email: string; code: string;}>({
            query: ({ email, code }) => ({
                url: `/account/active/`,
                method: 'POST',
                body: { email, otp: code }
            }),
            // invalidatesTags: []
        }),
        loginUser: builder.mutation<{ email: string; first_name: string; last_name: string; username: string, phone_no: string, message : string }, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: `/account/login/`,
                method: 'POST',
                body: { email, password }
            }),
            // invalidatesTags: []
        }),
    })
})

export const { useCreateUserMutation, useLoginUserMutation, useVerifyUserMutation } = baseApi;

export const reduxApi = baseApi;
export default baseApi;

