import { configureStore } from '@reduxjs/toolkit'
import baseApi from './Api/Api';
import TestSlice from './Slices/TestSlice';


const Store = configureStore({
    reducer: {
        test: TestSlice,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})
export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>
export default Store;