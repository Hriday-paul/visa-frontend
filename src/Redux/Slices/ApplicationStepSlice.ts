import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stepType = {
    step: number,
    stepList: { title: string }[]
}

const initStep: stepType = {
    step: 0,
    stepList: [
        {
            title: 'Personal details',
        },
        {
            title: 'Travel Information',
        },
        {
            title: 'Visa Information',
        },
        {
            title: 'Documents',
        },
    ]
};


const AplicationStepSlice = createSlice({
    name: 'steps',
    initialState: initStep,
    reducers: {
        updateStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload
        }
    }
});

export const {updateStep} = AplicationStepSlice.actions

export default AplicationStepSlice.reducer;