import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditApplicationResponseType } from "../Features/Types";

const initStep: EditApplicationResponseType = {
    id: 0,
    full_name: "",
    email: "",
    phone_number: "",
    permanent_address: "",
    present_address: "",
    city: "",
    nationality : "",
    occupation: "",
    date_of_birth: '',
    state_province: '',
    marital_status: '',
    educational_background: '',
    gender: '',
    visa_type: 'Family',
    purpose_of_visit: '',
    accommodation_details: "",
    emergency_contact_name: "",
    emergency_contact_relationship: '',
    emergency_contact_phone: "",
    emergency_contact_email: '',
    planned_duration_of_stay: 0,
    passport_no: '',
    passport_issue_date: '',
    passport_expiry_date: '',
    country_of_passport_issuance: "",
    user_photo: "",
    passport_photo: "",
    health_ensurence: "",
    travel_insurance: "",
    applicant_signature: "",
}


const EditApplicationSlice = createSlice({
    name: 'edit application',
    initialState: initStep,
    reducers: {
        addAllInfo: (state, { payload } : PayloadAction<EditApplicationResponseType>) => {
                state.full_name = payload.full_name,
                state.email = payload.email,
                state.phone_number = payload.phone_number,
                state.permanent_address = payload.permanent_address,
                state.present_address = payload.present_address,
                state.city = payload.city,
                state.nationality = payload.nationality,
                state.occupation = payload.occupation,
                state.date_of_birth = payload.date_of_birth,
                state.state_province = payload.state_province,
                state.marital_status = payload.marital_status,
                state.educational_background = payload.educational_background,
                state.gender = payload.gender,
                state.visa_type = payload.visa_type,
                state.purpose_of_visit = payload.purpose_of_visit,
                state.accommodation_details = payload.accommodation_details,
                state.emergency_contact_name = payload.emergency_contact_name,
                state.emergency_contact_relationship = payload.emergency_contact_relationship,
                state.emergency_contact_phone = payload.emergency_contact_phone,
                state.emergency_contact_email = payload.emergency_contact_email,
                state.planned_duration_of_stay = payload.planned_duration_of_stay,
                state.passport_no = payload.passport_no,
                state.passport_issue_date = payload.passport_issue_date,
                state.passport_expiry_date = payload.passport_expiry_date,
                state.country_of_passport_issuance = payload.country_of_passport_issuance,
                state.user_photo = payload.user_photo,
                state.passport_photo = payload.passport_photo,
                state.health_ensurence = payload.health_ensurence,
                state.travel_insurance = payload.travel_insurance,
                state.applicant_signature = payload.applicant_signature
        }
    }
});

export const { addAllInfo } = EditApplicationSlice.actions
export default EditApplicationSlice.reducer;
