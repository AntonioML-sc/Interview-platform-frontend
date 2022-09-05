import { configureStore } from "@reduxjs/toolkit";
import positionsSlice from "../containers/Positions/positionsSlice";
import userSlice from "../containers/User/userSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        positions: positionsSlice
    }
})