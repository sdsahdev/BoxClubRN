import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as APIS from "../../src/APIS/Urls";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

export const SendEmail = createAsyncThunk(`sendEmail`, async (body_data) => {
    console.log(body_data, "===bodydata===");

    try {
        const response = await axios({
            url: `${APIS.bASE_URL}${APIS.Send_Otp}`,
            method: 'POST',
            data: body_data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        console.log('Response:', response.data);

        if (response?.data?.success) {
            console.log(response?.data?.otp);
            const otp = response?.data?.otp;
            return otp;
        }
        showMessage({
            message: response?.data?.message,
            type: response?.data?.success ? 'success' : 'danger',
            backgroundColor: response?.data?.success ? "green" : 'red', // background color
            icon: response?.data?.success ? "success" : 'danger', // background color
            color: "#fff", // text color
        });
       
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


const EmailSendSlice = createSlice({
    name: 'login',
    initialState: {
        otp: null,
        loading: false,
        error: null,
        type:null
    },
    reducers: {
        setTypeOtp: (state, action) => {
            state.type = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(SendEmail.pending, (state) => {
                console.log("===otp loading==");
                state.loading = true;
                state.error = null;
            })
            .addCase(SendEmail.fulfilled, (state, action) => {
                console.log(action.payload, "===otp  datass");
                state.loading = false;
                state.otp = action.payload;
            })
            .addCase(SendEmail.rejected, (state, action) => {
                console.log(action.error.message, "===Error in send otp api==");
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export  const {setTypeOtp} =EmailSendSlice.actions;
export default EmailSendSlice.reducer;