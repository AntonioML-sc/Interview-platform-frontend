
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const registerUser = (role, lastName, firstName, email, password, phone, title, description) => async (dispatch) => {
    try {
        const user = await axios.post('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/register',
        {
            role: role,
            last_name: lastName,
            first_name: firstName,
            email: email,
            password: password,
            phone: phone,
            title: title,
            description: description
        });
        
        let response = user;
        if (response.status === 201 || response.status === 200) {
            dispatch(register(response.data));
        }
    } catch (error) {
        dispatch(logError(error));
    }
};

export const loginUser = () => async (dispatch) => {

};

export const { register, login, logout, logError } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;