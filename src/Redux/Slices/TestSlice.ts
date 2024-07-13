import { createSlice } from '@reduxjs/toolkit';

const initState : {id : number} = {id : 1}


const TestSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {}
});


export default TestSlice.reducer;

