// import Alt from "./userpic"
import React, { useEffect, useState} from 'react';

// import axios from 'axios';

import Search from './formcomponents/search';

import CreateDestinations from './formcomponents/createDestination';

import Moment from "moment";

import { useNavigate } from 'react-router-dom';

import LandingHead from './formcomponents/landingHead';

import { fetchPlaces } from "../redux/placeSlice"

import {useSelector, useDispatch} from 'react-redux';

function Landing () {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {menu, loading} = useSelector((state) => state.AllData);

    const nextpage = (e) => {
        navigate("/user")
    }

    useEffect(() => {
        dispatch(fetchPlaces());
      },[]);

    return (
        <>
            <LandingHead/>
        
            <div className="grid grid-cols-[1100px_minmax(10px,_1fr)_0px] w-full">
            <div className="grid grid-cols-4 space-x-3 p-5">
            {loading && <div className="bg-img-loader mt-5 bg-no-repeat w-full p-96 object-contain"></div>}
            {menu.map((item) => { 
                        const base64String = btoa(String.fromCharCode(...new Uint8Array(item.image.data.data)));
                        const myDate = Moment(item.time,"YYYYMMDD HH:mm").fromNow()
                return <div className="grid grid-cols-1 rounded-3xl bg-slate-100 justify-items-start
                         shadow-lg shadow-black h-3/6 my-5 box-border transition duration-700 hover:scale-105" key={item._id}>
                            <div className="h-48 flex flex-row">
                                <h1 className="absolute p-4 text-xl font-bold text-slate-900 capitalize">{myDate}</h1>
                                <img src={`data:image/png;base64,${base64String}`} alt={`img-loader`} className="rounded-t-3xl object-cover"/>
                            </div>
                            <div className="flex flex-col px-4 h-56 space-y-4 w-full">
                                <h2 className="text-slate-500">{item.tags}</h2>
                                <h1 className="font-bold text-xl capitalize">{item.title}</h1>
                                <p className="text-slate-500 text-sm text-clip indent-0.5 overflow-hidden">{item.message}</p>
                            </div>
                        </div>})}
                </div>

                <div className="py-10 items-center justify-center justify-between space-y-6">
                    <Search/>
                    <CreateDestinations/>
                </div>
            </div>
        </>
    )
}

export default Landing