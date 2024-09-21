/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';
import { userSupportType } from '../../pages/Dashboard/UserSupport/UserSupport';
import { adminDashboardChartType, adminDashboardCountType, adminDashboardVisaPaiChartType, ApplicationResponseType, EditApplicationResponseType } from './Types';
import { type DatesRangeValue } from '@mantine/dates';
import moment from 'moment'
import Rout from '../../routs/Rout';

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
    passport_front_photo: File | null;
    passport_back_photo: File | null;
    health_ensurence: File | null;
    travel_insurance: File | null;
    applicant_signature: File | null;
}

const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ['Application', 'allApplication', 'myApplicaions', 'interView_dates', 'interView_times', 'interview_schedules'],
    baseQuery: async (args, api, extraOptions) => {
        // Fetch base query with interceptors
        const baseQueryWithInterceptors = fetchBaseQuery({
            baseUrl: apiUrl,
        });

        // Make the request
        const result = await baseQueryWithInterceptors(args, api, extraOptions);

        if (result.error && result.error.status === 401) {
            Rout.navigate('/login')
        }
        return result;
    },
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
        addvisaApplication: builder.mutation<ApplicationResponseType, { data: any, token: string }>({
            query: ({ data, token }) => ({
                url: `/visa/visaapplication/`,
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
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
        interviewAvailableDates: builder.query<{ start_date: string, end_date: string, fully_booked_dates: string[] }, { token: string }>({
            query: ({ token }) => ({
                url: `/interview/get_date/`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ["interView_dates"],
        }),
        interviewAvailableTimes: builder.query<{ slots: { id: number, start_time: string, is_booked: boolean }[] }, { token: string, date: string }>({
            query: ({ token, date }) => ({
                url: `/interview/slot/?date=${date}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: (_, __, { date }) => [
                { type: 'interView_times', date }
            ],
        }),
        setInterviewDate: builder.mutation<EditApplicationResponseType, { token: string, data: { userId: number | null; slotId: number, applicationId: string | number }, encodedId: string }>({
            query: ({ token, data }) => ({
                url: `/interview/appointment/`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: { visa_application: data?.applicationId, user: data?.userId, schedule_slot: data?.slotId }
            }),
            invalidatesTags: (_, __, { encodedId }) => [{ type: 'Application', encodedId }],
        }),
        getAplicationWithMutate: builder.query<ApplicationResponseType, { token: string, id: any }>({
            query: ({ id, token }) => ({
                url: `/visa/visaapplication/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            providesTags: (_, __, { id }) => [
                { type: 'Application', id }
            ],
        }),


        // admin api request
        allApplication: builder.query<{ results: ApplicationResponseType[], count: number }, { token: string, limit: number, currentPage: number, full_name: string, email: string, phone_number: string, visaTypes: string[], submission_date: DatesRangeValue | undefined }>({
            query: ({ token, currentPage, limit, full_name, email, phone_number, visaTypes, submission_date }) => ({

                url: `/visa/visaapplication/?page=${currentPage}&page_size=${limit}${visaTypes?.map(item => '&visa_type=' + item).join('')}&gender=&is_approved=&rejected=&is_modified=&submission_date=${(typeof submission_date != 'undefined' && submission_date && submission_date[0] != null) ? moment(submission_date[0]).format('YYYY-MM-DD') : ''}&search=${full_name || phone_number || email}`,

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
        admnLogin: builder.mutation<{ token: { access: string, refresh: string }; email: string; first_name: string; last_name: string; username: string, phone_no: string, message: string, user_id: number }, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: `/account/adminlogin/`,
                method: 'POST',
                body: { email, password }
            }),
        }),
        addNewInterviewSchedule: builder.mutation<{ message: string }, { start_date: string, end_date: string, total_interview: string, token: string }>({
            query: ({ token, start_date, end_date, total_interview }) => ({
                url: `/interview/interview_admin/`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: { start_date, end_date, total_interview: parseInt(total_interview) }
            }),
            invalidatesTags: ['interView_dates'],
        }),
        allInterviewSchedule: builder.query<ApplicationResponseType[], { token: string}>({
            query: ({ token }) => ({
                url: `/interview/all_interview/`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            providesTags : ['interview_schedules']
        }),
        editUserInterviewSchedule: builder.mutation<EditApplicationResponseType, { token: string, data: { interview_date ?: string | undefined; start_time ?: string | undefined, appoinmentId ?: number, status : 'Reschedule' | 'Done' | 'Cancel' }, encodedId: string }>({
            query: ({ token, data }) => ({
                url: `/interview/all_interview/${data?.appoinmentId}/`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: { interview_date : data?.interview_date, start_time : data?.start_time, interview_status : data?.status }
            }),
            invalidatesTags: ['interview_schedules'],
        }),
    })
})

export const { useCreateUserMutation, useLoginUserMutation, useVerifyUserMutation, useAddvisaApplicationMutation, useNotificationQuery, useSendSupportMessageMutation, useVisaStatusMutation, useAllApplicationQuery, useApplicationDetailsQuery, useUpdateAccessToModifyApplicationMutation, useApproveApplicationMutation, useRejectApplicationMutation, useDeleteOneApplicationMutation, useAdminDashboardCountQuery, useAdminDashboardChartQuery, useAdminDashboardVisaPaiChartQuery, useEditVisaStepMutation, useMyallApplicationsQuery, useEditApplicationMutation, useInterviewAvailableDatesQuery, useInterviewAvailableTimesQuery, useSetInterviewDateMutation, useAdmnLoginMutation, useLazyGetAplicationWithMutateQuery, useAddNewInterviewScheduleMutation, useAllInterviewScheduleQuery, useEditUserInterviewScheduleMutation } = baseApi;

export const reduxApi = baseApi;







export default baseApi;

