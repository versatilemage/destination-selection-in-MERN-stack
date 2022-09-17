import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axios from "axios";

export const fetchPlaces = createAsyncThunk('place/getPlace',
    async() => {
        const {data} = await axios.get("http://localhost:6001/allplace") 
        return data
    }
)

const getAlldestination = createSlice({
    name: "Allplace",
    initialState: {
        menu: [],
        loading: null
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
