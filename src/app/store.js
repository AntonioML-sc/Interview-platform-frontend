import { configureStore } from "@reduxjs/toolkit";
import companySlice from "../containers/Company/companySlice";
import positionsSlice from "../containers/Position/positionsSlice";
import skillSlice from "../containers/Skill/skillSlice";
import skillTestSlice from "../containers/SkillTest/skillTestSlice";
import userSlice from "../containers/User/userSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        positions: positionsSlice,
        company: companySlice,
        skill: skillSlice,
        skillTest: skillTestSlice
    }
})