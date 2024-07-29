import { configureStore } from '@reduxjs/toolkit'
import baseApi from './Features/BaseApi';
import UserSlice from './Slices/UserSlice';
import ApplicationStepSlice from './Slices/ApplicationStepSlice';
import Application_infoSlice from './Slices/Application_infoSlice';


const Store = configureStore({
    reducer: {
        user: UserSlice,
        applicationStep: ApplicationStepSlice,
        application_infoSlice: Application_infoSlice,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})
export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>
export default Store;