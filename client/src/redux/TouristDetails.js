import {createSlice} from '@reduxjs/toolkit';

import axios from "axios";

import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.withCredentials = true

export const fetchTouristdetails = createAsyncThunk("cred/usercred",
    async() => {
        const {data} = await axios.get("http://localhost:6001/findtourist",{withCredentials: true}) 
        return data
    }
)

const getTouristCredentials = createSlice({
    name:"TouristDetails",
    initialState: {
        loading: false,
        tourist: []
    },
    extraReducers: {
        [fetchTouristdetails.pending]: (state, action) => {
            state.loading = true
        },
        [fetchTouristdetails.fulfilled]: (state, action) => {
            state.tourist = action.payload.user;
            state.loading = false
        },
        [fetchTouristdetails.rejected]: (state, action) => {
            console.log("why rejected", state, action)
        }
    }
})

const selectedTourist = getTouristCredentials.reducer

export default selectedTourist
