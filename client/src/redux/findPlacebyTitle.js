import {createSlice} from '@reduxjs/toolkit';

import axios from "axios";

import { createAsyncThunk } from '@reduxjs/toolkit';

export const DestinationbyTitle = createAsyncThunk('destinationTitle', async(search) => {
        const {data} = await axios.get(`http://localhost:6001/getbytitle/${search}`)
        return data
    }
)

const titleIdentifier = createSlice({
    name: "byTitle",
    initialState:{
        menu:[],
        loading: false
    },
    extraReducers:{
        [DestinationbyTitle.pending]: (state, action) => {
            state.loading = true;
        },
        [DestinationbyTitle.fulfilled]: (state, action) => {
            state.menu = (action.payload.data);
            state.loading = false;
        },
        [DestinationbyTitle.rejected]: (state, action) => {
            console.log('full', state, action);
        }
    }
})

const TitleReducer = titleIdentifier.reducer;

export default TitleReducer
