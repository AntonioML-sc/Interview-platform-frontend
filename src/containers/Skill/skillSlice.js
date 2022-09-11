import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const skillSlice = createSlice({
   name: "skill",
   initialState: {
      skill: "",
      skillList: []
   },
   reducers: {
      setSkill: (state, action) => {
         state.skill = action.payload
      },
      setSkillList: (state, action) => {
         state.skillList = action.payload
      },
      register: (state, action) => {
         return {
            ...state,
            isError: false,
            successMessage: 'Skill registered successfully',
            errorMessage: ''
         }
      },
      update: (state, action) => {
         return {
            ...state,
            isError: false,
            successMessage: 'Skill updated successfully',
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

export const registerSkill = (title, description, token) => async (dispatch) => {
   try {
      const body = {
         title: title,
         description: description
      }
      const config = {
         headers: { "Authorization": `Bearer ${token}` }
      }
      const skill = await axios.post('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/skills/new', body, config);

      let response = skill;
      if (response.status === 201 || response.status === 200) {
         dispatch(register());
      }
   } catch (error) {
      dispatch(logError(error));
   }
};

export const updateSkill = (id, title, description, token) => async (dispatch) => {
   try {
      const body = {
         title: title,
         description: description
      }
      const config = {
         headers: { "Authorization": `Bearer ${token}` }
      }
      const skill = await axios.put(`https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/skills/update/${id}`, body, config);

      let response = skill;
      if (response.status === 200) {
         dispatch(update());
      }
   } catch (error) {
      dispatch(logError(error));
   }
};

export const { setSkill, setSkillList, logError, register, update } = skillSlice.actions

export const selectSkill = (state) => state.skill.skill
export const selectSkillList = (state) => state.skill.skillList

export default skillSlice.reducer