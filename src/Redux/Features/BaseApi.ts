import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';
import { userSupportType } from '../../pages/Dashboard/UserSupport/UserSupport';

const apiUrl = import.meta.env.VITE_API_URL as string;

export type addApplicationType = {
    full_name: string,
    email: string;
    phone_number: string;
    permanent_address: string;
    present_address: string;
    city: string;
    nationality: string;
    occupation: string;
    date_of_birth: string;
    state_province: string;
    marital_status: 'Merit' | 'Unmerit' | '';
    educational_background: string;
    gender: 'Male' | 'Female' | 'Others' | '',
    visa_type: 'Tourist' | 'Business' | 'Student' | 'Work' | 'Medical' | 'Family',
    purpose_of_visit: string;
    accommodation_details: string;
    emergency_contact_name: string;
    emergency_contact_relationship: string;
    emergency_contact_phone: string;
    emergency_contact_email: string;
    planned_duration_of_stay: number;
    passport_no: string,
    passport_issue_date: string;
    passport_expiry_date: string;
    country_of_passport_issuance: string;
    user_photo: File | null;
    passport_photo: File | null;
    health_ensurence: File | null;
    travel_insurance: File | null;
    applicant_signature: File | null;
}

const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl
    }),
    endpoints: (builder) => ({
        createUser: builder.mutation<void, { email: string; first_name: string; last_name: string; username: string, phone_no: string, password: string, confirm_password: string }>({
            query: ({ email, first_name, last_name, username, phone_no, password, confirm_password }) => ({
                url: `/account/register/`,
                method: 'POST',
                body: { email, first_name, last_name, username, password, password2: confirm_password, phone_no }
            }),
        }),
        verifyUser: builder.mutation<{ token: String; email: string; first_name: string; last_name: string; username: string, phone_no: string, message: string }, { email: string; code: string; }>({
            query: ({ email, code }) => ({
                url: `/account/active/`,
                method: 'POST',
                body: { email, otp: code }
            }),
        }),
        loginUser: builder.mutation<{ token: String; email: string; first_name: string; last_name: string; username: string, phone_no: string, message: string }, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: `/account/login/`,
                method: 'POST',
                body: { email, password }
            }),
        }),
        addvisaApplication: builder.mutation({
            query: (data) => ({
                url: `/visa/visaapplication/`,
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${data.get('token')}`,
                },
                
            }),
            // invalidatesTags: []
        }),
        sendSupportMessage: builder.mutation<void, { formData: userSupportType, token: string }>({
            query: ({ formData, token }) => ({
                url: `/support/support/`,
                method: 'POST',
                credentials: 'include',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),
        visaStatus: builder.mutation<{ massage: string, visa_status: string, update_at: string }, { id: string }>({
            query: ({ id }) => ({
                url: `/visa/visa-status/${id}`,
                method: 'GET',
            }),
        }),
        notification: builder.query<{ title: string; message: string; created_at: string }[], void>({
            query: () => `/notification/notification/`,
            // providesTags: []
        }),
        allApplication: builder.query<{ title: string; message: string; created_at: string }[], { token: string }>({
            query: ({ token }) => ({
                url: `/visa/visaapplication/`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            // providesTags: []
        }),

    })
})

export const { useCreateUserMutation, useLoginUserMutation, useVerifyUserMutation, useAddvisaApplicationMutation, useNotificationQuery, useSendSupportMessageMutation, useVisaStatusMutation, useAllApplicationQuery } = baseApi;

export const reduxApi = baseApi;
export default baseApi;

