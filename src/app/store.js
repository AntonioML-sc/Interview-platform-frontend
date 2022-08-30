import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../containers/User/userSlice";

export default configureStore({
    reducer: {
        user: userSlice
    }
})