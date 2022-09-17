import React, { useEffect } from 'react';

import LandingHead from './formcomponents/landingHead';

import {useSelector, useDispatch} from 'react-redux';

import { fetchClickedDestination } from '../redux/click';

import { useNavigate } from 'react-router-dom';

import Moment from "moment";

function Userpage () {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading, destination} = useSelector((state) => state.clickDestination)

    // useEffect(() => {
    //     dispatch(fetchClickedDestination())
    // },[])

    console.log(destination)

    // const forConsole = destination.map((item) => {
    //     return 
    // })

    return (
        <>
            <div>
                <LandingHead/>
                {destination && destination.map((item) => {
                    const myDate = Moment(item.time,"YYYYMMDD HH:mm").fromNow()
                    const base64String = btoa(String.fromCharCode(...new Uint8Array(item.image.data.data)));
                    return<div key={item._id} className="grid grid-cols-2 space-x-4 p-5 bg-slate-100 shadow-lg shadow-slate-600">
                        <div className="space-y-5 grid grid-row-4 items-justify">
                            <h1 className="text-2xl font-bold capitalize">{item.title}</h1>
                            <h2 className="text-slate-500 text-xl">{item.tags}</h2>
                            <p className="text-slate-700 text-xl">{item.message}</p>
                            <div className="flex flex-col space-y-2">
                                <h1 className="text-xl font-bold capitalize">created by: </h1>
                                <h1 className="text-slate-500 text-lg">{myDate}</h1>
                            </div>
                        </div>

                        <div className="flex flex-row justify-end object-cover">
                            <img src={`data:image/png;base64,${base64String}`} alt={`img-loader`} 
                            className="rounded-3xl object-cover aspect-square w-[40em] h-[30em]"/>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default Userpage
