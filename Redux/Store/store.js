// store.js
import { configureStore } from '@reduxjs/toolkit';
import boxRegisterSlice from '../Slices/boxRegisterSlice';
import LoginSlice from '../Slices/LoginSlice';
import EmailSendSlice from '../Slices/EmailSendSlice';

const store = configureStore({
    reducer: {
        boxregister: boxRegisterSlice,
        LoginReducer: LoginSlice,
        SendEmailReducer: EmailSendSlice,
        // Add more reducers here if needed
    },
});

export default store;
