
import { createSlice } from '@reduxjs/toolkit/dist/createSlice';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: ''
    },
    reducers: {
        register: (state, action) => {
            return {
                ...state,
                isRegister: true,
                successMessage: 'User registered successfully'
            }
        },
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        logout: (state, action) => {
            return {
                ...state.initialState
            }
        },
        logError: (state, action) => {
            return {
                ...state,
                isError: !action.payload.success,
                errorMessage: action.payload.message
            }
        }
    }
});

export const registerUser = () => async (dispatch) => {

};

export const loginUser = () => async (dispatch) => {

};

export const { register, login, logout, logError } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;