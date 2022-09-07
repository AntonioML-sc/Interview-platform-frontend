import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const companySlice = createSlice({
   name: "company",
   initialState: {
      company: ""
   },
   reducers: {
      setCompany: (state, action) => {
         state.position = action.payload
      },
      register: (state, action) => {
         return {
            ...state,
            isError: false,
            successMessage: 'Company registered successfully',
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

export const registerCompany = (name, address, email, description, token) => async (dispatch) => {
   try {
      const body = {
         name: name,
         address: address,
         email: email,
         description: description
      }
      const config = {
         headers: { "Authorization": `Bearer ${token}` }
      }
      const company = await axios.post('https://aml-mysql-08-18-22-laravel-ip.herokuapp.com/api/companies/new', body, config);

      let response = company;
      if (response.status === 201 || response.status === 200) {
         dispatch(register());
      }
   } catch (error) {
      dispatch(logError(error));
   }
};

export const { setCompany, logError, register } = companySlice.actions

export const selectCompany = (state) => state.company.company

export default companySlice.reducer