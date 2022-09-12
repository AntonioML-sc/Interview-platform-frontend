import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const skillTestSlice = createSlice({
    name: "skillTest",
    initialState: {
        test: {},
        userId: ""
    },
    reducers: {
        setTest: (state, action) => {
            state.test = action.payload
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        register: (state, action) => {
            return {
                ...state,
                isError: false,
                successMessage: 'Test registered successfully',
                errorMessage: ''
            }
        },
        logError: (state, action) => {
            return {
                ...state,
                isError: !action.payload.success,
                errorMessage: action.payload.message,
                successMessage: '',
            }
        }
    }
})

export const createTest = (body, token) => async (dispatch) => {
    try {        
        const config = {
			headers: { "Authorization": `Bearer ${token}` }
		}
        const test = await axios.post(`https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/tests/new`, body, config)

        let response = test;
        if (response.status === 201 || response.status === 200) {
            dispatch(register());
        }

    } catch (error) {        
        dispatch(logError(error));
    }
}

export const { setTest, setUserId, register, logError } = skillTestSlice.actions;

export const selectTest = (state) => state.skillTest.test
export const selectUserId = (state) => state.skillTest.userId

export default skillTestSlice.reducer