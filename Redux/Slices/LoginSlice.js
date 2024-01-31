import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as APIS from "../../src/APIS/Urls";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

export const loginUser = createAsyncThunk(`loginUser`, async (body_data) => {
    console.log(body_data, "===bodydata===");

    try {
        const response = await axios({
            url: `${APIS.ADMIN_bASE_URL}${APIS.Login}`,
            method: 'POST',
            data: body_data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        console.log('Response:', response.data?.data);

        showMessage({
            message: response?.data?.message,
            type: response?.data?.success ? 'success' : 'danger',
            backgroundColor: response?.data?.success ? "green" : 'red',
            icon: response?.data?.success ? "success" : 'danger',
            color: "#fff",
        });

        const user = response?.data?.data;
        return user; // This value will be set as action.payload when the promise is resolved
    } catch (error) {
        console.error('Error:', error);

        showMessage({
            message: 'Something went wrong',
            type: "danger",
            backgroundColor: "red",
            color: "#fff",
            icon: 'danger',
        });

        // Rethrow the error to let Redux Toolkit handle it as rejected
        throw error;
    }
});


const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                console.log("===login loading==");
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload, "===user datass");
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log(action.error.message, "===Error in login api==");
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export default LoginSlice.reducer;