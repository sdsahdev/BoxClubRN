// store.js
import { configureStore } from '@reduxjs/toolkit';
import boxRegisterSlice from '../Slices/boxRegisterSlice';
import LoginSlice from '../Slices/LoginSlice';

const store = configureStore({
    reducer: {
        boxregister: boxRegisterSlice,
        LoginReducer: LoginSlice,
        // Add more reducers here if needed
    },
});

export default store;
