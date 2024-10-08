import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Inputs } from "../../pages/Dashboard/UserDashboard/Personal_information/Personal_information";
import { TravelInput_types } from "../../pages/Dashboard/UserDashboard/Application/Travel_information";
import { Visa_information_types } from "../../pages/Dashboard/UserDashboard/Application/Visa_information";

type infoType = {
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
    marital_status: 'Married' | 'Single' | '';
    educational_background: string;
    postal_code: number;
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
    user_photo: null | string ,
    passport_front_photo: null | string,
    passport_back_photo: null | string,
    health_ensurence: null | string,
    travel_insurance: null | string ,
    applicant_signature: null | string
};

const initStep: infoType = {
    full_name: '',
    email: '',
    phone_number: '',
    permanent_address: '',
    present_address: '',
    city: '',
    nationality: '',
    occupation: '',
    date_of_birth: '',
    postal_code: 0,
    state_province: '',
    marital_status: '',
    educational_background: '',
    gender: '',
    visa_type: 'Tourist',
    purpose_of_visit: '',
    accommodation_details: '',
    emergency_contact_name: '',
    emergency_contact_relationship: '',
    planned_duration_of_stay: 0,
    emergency_contact_phone: '',
    emergency_contact_email: '',
    passport_no: '',
    passport_issue_date: '',
    passport_expiry_date: '',
    country_of_passport_issuance: '',
    user_photo: '',
    passport_front_photo: '',
    passport_back_photo: '',
    health_ensurence: '',
    travel_insurance: '',
    applicant_signature: ''
};

const Application_infoSlice = createSlice({
    name: 'steps',
    initialState: initStep,
    reducers: {
        addPersonalInfo: (state, { payload }: PayloadAction<Inputs>) => {
            state.full_name = payload.full_name;
            state.email = payload.email;
            state.phone_number = payload.phone_number;
            state.permanent_address = payload.permanent_address;
            state.present_address = payload.present_address;
            state.city = payload.city;
            state.nationality = payload.nationality;
            state.occupation = payload.occupation;
            state.date_of_birth = payload.date_of_birth;
            state.state_province = payload.state_province;
            state.marital_status = payload.marital_status;
            state.educational_background = payload.educational_background;
            state.gender = payload.gender;
            state.postal_code = payload.postal_code
        },
        addTravelInfo: (state, { payload }: PayloadAction<TravelInput_types>) => {
            state.visa_type = payload.visa_type;
            state.purpose_of_visit = payload.purpose_of_visit;
            state.emergency_contact_name = payload.emergency_contact_name;
            state.emergency_contact_relationship = payload.emergency_contact_relationship;
            state.emergency_contact_phone = payload.emergency_contact_phone;
            state.emergency_contact_email = payload.emergency_contact_email;
            state.planned_duration_of_stay = payload.planned_duration_of_stay;
            state.accommodation_details = payload.accommodation_details;
        },
        addVisaInfo: (state, { payload }: PayloadAction<Visa_information_types>) => {
            state.passport_no = payload.passport_no;
            state.passport_issue_date = payload.passport_issue_date;
            state.passport_expiry_date = payload.passport_expiry_date;
            state.country_of_passport_issuance = payload.country_of_passport_issuance;
        },
        resetApplication: (state) => {
            state.full_name = '';
            state.email = '';
            state.phone_number = '';
            state.permanent_address = '';
            state.present_address = '';
            state.city = '';
            state.postal_code = 0
            state.nationality = '';
            state.occupation = '';
            state.date_of_birth = '';
            state.state_province = '';
            state.marital_status = 'Single';
            state.educational_background = '';
            state.gender = 'Male';
            state.visa_type = 'Student';
            state.purpose_of_visit = '';
            state.emergency_contact_name = '';
            state.emergency_contact_relationship = '';
            state.emergency_contact_phone = '';
            state.emergency_contact_email = '';
            state.planned_duration_of_stay = 0;
            state.accommodation_details = '';
            state.passport_no = '';
            state.passport_issue_date = '';
            state.passport_expiry_date = '';
            state.country_of_passport_issuance = '';
            state.user_photo = null;
            state.passport_front_photo = null;
            state.passport_back_photo = null;
            state.health_ensurence = null;
            state.travel_insurance = null;
            state.applicant_signature = null;
        },
        addDocument: (
            state,
            { payload }: PayloadAction<{
                key: 'user_photo' | 'passport_front_photo' | 'passport_back_photo' | 'health_ensurence' | 'travel_insurance' | 'applicant_signature';
                value: string;
            }>
        ) => {
            state[payload.key] = payload.value;
        }
    }
});

export const { addPersonalInfo, addTravelInfo, addVisaInfo, resetApplication, addDocument } = Application_infoSlice.actions;
export default Application_infoSlice.reducer;
