import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userType = {
    fullName: string,
    userName: string,
    email: string,
    phone: string,
    isAuthonicated: boolean,
    isVerified: boolean
}

const initState: userType = {
    fullName: '',
    userName: '',
    email: '',
    phone: '',
    isAuthonicated: false,
    isVerified: false
}

type addUserDetailsPayload = {
    fullName: string,
    userName: string,
    email: string,
    phone: string,
}

type updateVerified = {
    fullName: string,
    userName: string,
    email: string,
    phone: string,
    isVerified: boolean,
}

const UserSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        addUserDetails: (state, { payload }: PayloadAction<addUserDetailsPayload>) => {
            state.fullName = payload.fullName;
            state.userName = payload.userName;
            state.email = payload.email;
            state.phone = payload.phone;
        },
        updateUserVerified: (state, { payload }: PayloadAction<updateVerified>) => {
            state.fullName = payload.fullName;
            state.userName = payload.userName;
            state.email = payload.email;
            state.phone = payload.phone;
            state.isAuthonicated = true;
            state.isVerified = payload.isVerified;
        }
    }
});

export const { addUserDetails, updateUserVerified } = UserSlice.actions
export default UserSlice.reducer;

