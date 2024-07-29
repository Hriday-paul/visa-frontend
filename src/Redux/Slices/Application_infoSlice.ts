import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Inputs } from "../../pages/Dashboard/UserDashboard/Personal_information/Personal_information";

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
    gender: 'Male' | 'Female' | 'Others' | ''
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
        }
    }
});

export const {addPersonalInfo}= Application_infoSlice.actions
export default Application_infoSlice.reducer;
