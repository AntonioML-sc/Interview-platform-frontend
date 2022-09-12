import { createSlice } from "@reduxjs/toolkit";

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

export const { setTest, setUserId, register, logError } = skillTestSlice.actions;

export const selectTest = (state) => state.skillTest.test
export const selectUserId = (state) => state.skillTest.userId

export default skillTestSlice.reducer