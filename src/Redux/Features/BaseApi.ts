/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';
import { userSupportType } from '../../pages/Dashboard/UserSupport/UserSupport';
import { adminDashboardChartType, adminDashboardCountType, adminDashboardVisaPaiChartType, ApplicationResponseType, EditApplicationResponseType } from './Types';

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
    tagTypes: ['Application', 'allApplication', 'myApplicaions'],
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
        verifyUser: builder.mutation<{ token: { access: string, refresh: string }; email: string; first_name: string; last_name: string; username: string, phone_no: string, message: string, user_id: number }, { email: string; code: string; }>({
            query: ({ email, code }) => ({
                url: `/account/active/`,
                method: 'POST',
                body: { email, otp: code }
            }),
        }),
        loginUser: builder.mutation<{ token: { access: string, refresh: string }; email: string; first_name: string; last_name: string; username: string, phone_no: string, message: string, user_id: number }, { email: string; password: string }>({
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
            invalidatesTags: ['myApplicaions']
        }),
        sendSupportMessage: builder.mutation<void, { formData: userSupportType, token: string }>({
            query: ({ formData, token }) => ({
                url: `/support/support/`,
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),
        visaStatus: builder.mutation<{ message: string, visa_status: string, update_at: string }, { id: string, token: string }>({
            query: ({ id, token }) => ({
                url: `/visa/visa-status/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),
        notification: builder.query<{ title: string; message: string; created_at: string }[], void>({
            query: () => `/notification/notification/`,
            // providesTags: []
        }),
        myallApplications: builder.query<ApplicationResponseType[], { token: string, userId: any }>({
            query: ({ token, userId }) => ({
                url: `/visa/application-count/${userId}/`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['myApplicaions'],
        }),
        editApplication: builder.mutation<EditApplicationResponseType, { id: string | number, token: string, data: any }>({
            query: ({ id, token, data }) => ({
                url: `/visa/visaapplication/${id}/`,
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: data
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'Application', id }],
        }),
        bookedDateList: builder.query<{ fully_booked_dates: string[] }, { token: string }>({
            query: ({ token }) => ({
                url: `/interview/booked_dates/`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        setInterviewDate: builder.mutation<EditApplicationResponseType, { token: string, data: { interview_date: string; id: string | number}, encodedId : string }>({
            query: ({ token, data }) => ({
                url: `/interview/appointment/`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: {visa_application : data?.id, interview_date : data?.interview_date}
            }),
            invalidatesTags: (_, __, { encodedId }) => [{ type: 'Application', encodedId }],
        }),

        // admin api request
        allApplication: builder.query<{ results: ApplicationResponseType[], count: number }, { token: string, limit: number, currentPage: number }>({
            query: ({ token, currentPage, limit }) => ({
                url: `/visa/visaapplication/?page=${currentPage}&page_size=${limit}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }),
            providesTags: ['allApplication']
        }),
        applicationDetails: builder.query<ApplicationResponseType, { token: string, id: any }>({
            query: ({ token, id }) => ({
                url: `/visa/visaapplication/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: (_, __, { id }) => [
                { type: 'Application', id }
            ],
        }),
        adminDashboardCount: builder.query<adminDashboardCountType, { token: string }>({
            query: ({ token }) => ({
                url: `/report/ar-report/`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),
        adminDashboardChart: builder.query<adminDashboardChartType, { token: string }>({
            query: ({ token }) => ({
                url: `/report/type-report/`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),
        adminDashboardVisaPaiChart: builder.query<adminDashboardVisaPaiChartType, { token: string }>({
            query: ({ token }) => ({
                url: `/report/status-report/`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),
        updateAccessToModifyApplication: builder.mutation<{ message: string }, { id: any, token: string, is_modified: boolean }>({
            query: (data) => ({
                url: `/visa/visaapplication/${data?.id}/`,
                method: 'PATCH',
                body: { is_modified: data?.is_modified },
                headers: {
                    Authorization: `Bearer ${data?.token}`
                }
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'Application', id }],
        }),
        approveApplication: builder.mutation<{ message: string }, { id: any, token: string, is_approved: boolean, rejected: boolean }>({
            query: (data) => ({
                url: `/visa/visaapplication/${data?.id}/`,
                method: 'PATCH',
                body: { is_approved: data?.is_approved, rejected: data?.rejected },
                headers: {
                    Authorization: `Bearer ${data?.token}`
                }
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'Application', id }],
        }),
        rejectApplication: builder.mutation<{ message: string }, { id: any, token: string, rejected: boolean, is_approved: boolean }>({
            query: (data) => ({
                url: `/visa/visaapplication/${data?.id}/`,
                method: 'PATCH',
                body: { rejected: data?.rejected, is_approved: data?.is_approved },
                headers: {
                    Authorization: `Bearer ${data?.token}`
                }
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'Application', id }],
        }),
        deleteOneApplication: builder.mutation<{ message: string }, { id: number, token: string }>({
            query: (data) => ({
                url: `/visa/visaapplication/${data?.id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${data?.token}`
                }
            }),
            invalidatesTags: ['allApplication'],
        }),
        editVisaStep: builder.mutation<{ message: string }, { id: string, token: string, message: string; visa_status: string, tracking_id: string }>({
            query: (data) => ({
                url: `/visa/visa-status/${data?.tracking_id}/`,
                method: 'PATCH',
                body: { message: data?.message, visa_status: data?.visa_status },
                headers: {
                    Authorization: `Bearer ${data?.token}`
                }
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'Application', id }],
        }),
    })
})

export const { useCreateUserMutation, useLoginUserMutation, useVerifyUserMutation, useAddvisaApplicationMutation, useNotificationQuery, useSendSupportMessageMutation, useVisaStatusMutation, useAllApplicationQuery, useApplicationDetailsQuery, useUpdateAccessToModifyApplicationMutation, useApproveApplicationMutation, useRejectApplicationMutation, useDeleteOneApplicationMutation, useAdminDashboardCountQuery, useAdminDashboardChartQuery, useAdminDashboardVisaPaiChartQuery, useEditVisaStepMutation, useMyallApplicationsQuery, useEditApplicationMutation, useBookedDateListQuery, useSetInterviewDateMutation } = baseApi;

export const reduxApi = baseApi;







export default baseApi;

