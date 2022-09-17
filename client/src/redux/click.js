import {createSlice} from '@reduxjs/toolkit';

import axios from "axios";

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchClickedDestination = createAsyncThunk("click/component",
async(search) => {
    const {data} = await axios.get(`http://localhost:6001/getbytitle/${search}`)
    return data
    }
)

const getDestinationbyClick = createSlice({
    name: "clickDestination",
    initialState: {
        loading: null,
        destination: null
    },
    extraReducers: {
        [fetchClickedDestination.pending]: (state, action) => {
            state.loading = true
        },
        [fetchClickedDestination.fulfilled]: (state, action) => {
            state.destination = action.payload.data;
            state.loading = false
        },
        [fetchClickedDestination.rejected]: (state, action) => {
            console.log("reason of failure",state, action)
        }
    }
})

const selectedDestination = getDestinationbyClick.reducer

export default selectedDestination
