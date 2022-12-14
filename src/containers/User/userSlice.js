
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
                ...action.payload,
                isError: false,
                successMessage: 'User registered successfully',
                errorMessage: ''
            }
        },
        update: (state, action) => {
            return {
                ...state,
                ...action.payload,
                isError: false,
                successMessage: 'User account updated successfully',
                errorMessage: ''
            }
        },
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        refresh: (state, action) => {
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
                errorMessage: action.payload.message,
                successMessage: '',
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
            const config = {
                headers: { "Authorization": `Bearer ${user.data.token}` }
            }
            const userProfile = await axios.get('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/my-profile', config);
            const profileData = {
                "data": userProfile.data.data
            }
            dispatch(register({ ...profileData, token: user.data.token }));
        }
    } catch (error) {
        dispatch(logError(error));
    }
};

export const loginUser = (body) => async (dispatch) => {
    try {
        const user = await axios.post('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/login', body);

        if (user.status === 200) {
            const config = {
                headers: { "Authorization": `Bearer ${user.data.token}` }
            }
            const userProfile = await axios.get('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/my-profile', config);
            const profileData = {
                "data": userProfile.data.data
            }
            dispatch(login({ ...profileData, token: user.data.token }));
        }

    } catch (error) {
        dispatch(logError(error));
    }
};

export const refreshUserData = () => async (dispatch, getState) => {
    const userInfo = getState().user

    try {
        const config = {
            headers: { "Authorization": `Bearer ${userInfo.token}` }
        }
        const userProfile = await axios.get('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/my-profile', config);
        const profileData = {
            "data": userProfile.data.data
        }
        dispatch(refresh({ ...profileData, token: userInfo.token }));
    } catch (error) {
        dispatch(logError(error));
    }
};

export const updateProfile = (body) => async (dispatch, getState) => {
    const userInfo = getState().user

    try {
        const config = {
            headers: { "Authorization": `Bearer ${userInfo.token}` }
        }
        const userUpdate = await axios.put('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/my-profile/update', body, config);

        if (userUpdate.status === 200 || userUpdate.status === 201) {
            const userProfile = await axios.get('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/my-profile', config);
            const profileData = {
                "data": userProfile.data.data
            }
            dispatch(update({ ...profileData, token: userInfo.token }));
        }
    } catch (error) {
        dispatch(logError(error));
    }
}

export const { register, login, logout, logError, refresh, update } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;