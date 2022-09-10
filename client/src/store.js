import { configureStore, combineReducers } from "@reduxjs/toolkit";

import allPlaces from "./redux/placeSlice";

const rootReducer = combineReducers({
    AllData: allPlaces
})

const store = configureStore({
    reducer: rootReducer
})

export default store
