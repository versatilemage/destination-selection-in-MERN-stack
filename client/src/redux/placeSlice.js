import {createSlice} from '@reduxjs/toolkit';

import axios from "axios";

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPlaces = createAsyncThunk('getPlace', () => {
    const res = axios.get("http://localhost:6001/allplace").then((data) => {
        return data.json()
    })
    return res
})

const getAlldestination = createSlice({
    name: "Allplace",
    initialState: {
        menu: [],
        loading: false
    },
    extraReducers: {
        [fetchPlaces.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchPlaces.fulfilled]: (state, action) => {
            state.menu = action.payload.data;
            state.loading = false
        },
        [fetchPlaces.rejected]: (state, action) => {
            console.log("full", state, action)
        }
    }
})

const allPlaces = getAlldestination.reducer;

export default allPlaces;
