import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const positionsSlice = createSlice({
    name: "positions",
    initialState: {
        positionsList: [],
        position: ""
    },
    reducers: {
        setPosition: (state, action) => {
            state.position = action.payload
        },
        setPositionsList: (state, action) => {
            state.positionsList = action.payload
        },
        register: (state, action) => {
            return {
                ...state,
                isError: false,
                successMessage: 'Position registered successfully',
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

export const registerPosition = (title, description, companyName, location, mode, salary, token) => async (dispatch) => {
    try {
        const body = {
            title: title,
            description: description,
            company_name: companyName,
            location: location,
            mode: mode,
            salary: salary
        }
        const config = {
			headers: { "Authorization": `Bearer ${token}` }
		}
        const position = await axios.post('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/positions/new', body, config);
        
        let response = position;
        if (response.status === 201 || response.status === 200) {
            dispatch(register());
        }
    } catch (error) {
        dispatch(logError(error));
    }
};

export const { setPosition, setPositionsList, logError, register } = positionsSlice.actions

export const selectPosition = (state) => state.positions.position
export const selectPositionsList = (state) => state.positions.positionsList

export default positionsSlice.reducer