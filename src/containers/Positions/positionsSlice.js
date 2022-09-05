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
        setPositionList: (state, action) => {
            state.positionsList = action.payload
        }
    }
})

export const { setPosition, setPositionList } = positionsSlice.actions

export const selectPosition = (state) => state.positions.position
export const selectPositionList = (state) => state.positions.positionsList

export default positionsSlice.reducer