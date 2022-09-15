import {createSlice} from '@reduxjs/toolkit';

// import axios from "axios";

import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.withCredentials = true

export const fetchTouristdetails = createAsyncThunk("cred/usercred", async() => {
    try{
        const res = await fetch(`http://localhost:6001/findtourist`,{withCredentials: true}).then((data) => {
            return data.json()
        })
        return res
    }catch(err) {
        return(err)
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
            state.menu = action.payload.user;
            state.loading = false
        },
        [fetchTouristdetails.rejected]: (state, action) => {
            console.log("why rejected", state, action)
        }
    }
})

const selectedTourist = getTouristCredentials.reducer

export default selectedTourist
