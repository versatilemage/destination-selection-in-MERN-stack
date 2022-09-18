import { configureStore, combineReducers } from "@reduxjs/toolkit";

import allPlaces from "./redux/placeSlice";

import TitleReducer from "./redux/findPlacebyTitle";

import selectedTourist from "./redux/TouristDetails";

import selectedDestination from "./redux/click";

import status from "./redux/loginStatus";

import statusLog from "./redux/logout";

const rootReducer = combineReducers({
    AllData: allPlaces,
    byTitle: TitleReducer,
    TouristDetails: selectedTourist,
    clickDestination: selectedDestination,
    onlineStatus: status,
    loggedout : statusLog
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
})

export default store
