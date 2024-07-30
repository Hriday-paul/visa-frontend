import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Inputs } from "../../pages/Dashboard/UserDashboard/Personal_information/Personal_information";
import { TravelInput_types } from "../../pages/Dashboard/UserDashboard/Application/Travel_information";

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
    marital_status: 'Merit' | 'Unmerit' | '';
    educational_background: string;
    health_information: string;
    gender: 'Male' | 'Female' | 'Others' | '',
    visa_type: 'Tourist' | 'Business' | 'Student' | 'Work' | 'Medical' | 'Family',
    purpose_of_visit: string;
    emergency_contact_name: string;
    emergency_contact_relationship: string;
    emergency_contact_phone: string;
    emergency_contact_email: string;
    planned_duration_of_stay: number;
    passport_no: string,
    passport_issue_date: string;
    passport_expiry_date: string;
    country_of_passport_issuance: string;
}

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
    state_province: '',
    marital_status: '',
    educational_background: '',
    health_information: '',
    gender: '',
    visa_type: 'Tourist',
    purpose_of_visit: '',
    emergency_contact_name: '',
    emergency_contact_relationship: '',
    planned_duration_of_stay: 0,
    emergency_contact_phone: '',
    emergency_contact_email: '',
    passport_no: '',
    passport_issue_date: '',
    passport_expiry_date: '',
    country_of_passport_issuance: '',
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
            state.health_information = payload.health_information;
            state.gender = payload.gender;
            
        },
        addTravelInfo: (state, { payload }: PayloadAction<TravelInput_types>) => {
            state.visa_type = payload.visa_type;
            state.purpose_of_visit = payload.purpose_of_visit;
            state.emergency_contact_name = payload.emergency_contact_name;
            state.emergency_contact_relationship = payload.emergency_contact_relationship;
            state.emergency_contact_phone = payload.emergency_contact_phone;
            state.emergency_contact_email = payload.emergency_contact_email;
            state.planned_duration_of_stay = payload.planned_duration_of_stay;
        }
    }
});

export const { addPersonalInfo, addTravelInfo } = Application_infoSlice.actions
export default Application_infoSlice.reducer;
