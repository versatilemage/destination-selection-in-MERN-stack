import {createSlice} from '@reduxjs/toolkit';

import axios from "axios";

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTouristdetails = createAsyncThunk("cred/usercred", async() => {
    try{
        const res = await fetch (`http://localhost:6001/findtourist`).then((data) => {
            return data.json()
        })
        return res
    }catch(err) {
        console.log(err)
    }
})

const getTouristCredentials = createSlice({
    name:"TouristDetails",
    initialState: {
        loading: false,
        menu: []
    },
    extraReducers: {
        [fetchTouristdetails.pending]: (state, action) => {
            state.loading = true
        },
        [fetchTouristdetails.fulfilled]: (state, action) => {
            state.menu = action.payload.data;
            state.loading = false
        },
        [fetchTouristdetails.rejected]: (state, action) => {
            console.log("why rejected", state, action)
        }
    }
})

const selectedTourist = getTouristCredentials.reducer

export default selectedTourist
