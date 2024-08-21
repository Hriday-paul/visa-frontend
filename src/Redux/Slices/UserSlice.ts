import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userType = {
    fullName: string,
    userName: string,
    email: string,
    phone: string,
    id : number | null,
    isAuthonicated: boolean,
    isVerified: boolean,
    local : string
}

const initState: userType = {
    fullName: '',
    userName: '',
    email: '',
    phone: '',
    id : null,
    isAuthonicated: false,
    isVerified: false,
    local : 'zh-cn'
}

type addUserDetailsPayload = {
    fullName: string,
    userName: string,
    email: string,
    phone: string,
    id : number
}

type updateVerified = {
    fullName: string,
    userName: string,
    email: string,
    phone: string,
    id : number,
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
            state.id = payload.id
        },
        updateUserVerified: (state, { payload }: PayloadAction<updateVerified>) => {
            state.fullName = payload.fullName;
            state.userName = payload.userName;
            state.email = payload.email;
            state.phone = payload.phone;
            state.id = payload.id
            state.isAuthonicated = true;
            state.isVerified = payload.isVerified;
        },
        resetUser : (state)=>{
            state.fullName = '';
            state.userName = '';
            state.email = "";
            state.phone = "";
            state.id = null
            state.isAuthonicated = false;
            state.isVerified = false;
        }
    }
});

export const { addUserDetails, updateUserVerified, resetUser } = UserSlice.actions
export default UserSlice.reducer;

