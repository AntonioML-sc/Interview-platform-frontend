import { createSlice } from "@reduxjs/toolkit";

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

export const registerPosition = (title, description, companyName, location, mode, salary) => async (dispatch) => {
    try {
        const position = await axios.post('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/positions/new',
            {
                title: title,
                description: description,
                company_name: companyName,
                location: location,
                mode: mode,
                salary: salary
            });
    } catch (error) {
        dispatch(logError(error));
    }
};

export const { setPosition, setPositionsList } = positionsSlice.actions

export const selectPosition = (state) => state.positions.position
export const selectPositionsList = (state) => state.positions.positionsList

export default positionsSlice.reducer