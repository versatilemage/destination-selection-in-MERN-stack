import React, { useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';

import {Link} from "react-router-dom"

import { fetchTouristdetails } from '../../redux/TouristDetails';

import { loginAction } from '../../redux/loginStatus';

import axios from "axios";

axios.defaults.withCredentials = true

function LandingHead () {
    const dispatch = useDispatch()
    const isLoggedin = useSelector((state) => state.onlineStatus);
    const {tourist} = useSelector((state) => state.TouristDetails);
    const sendlogoutRequest = async() => {
        const res = await axios.post("http://localhost:6001/logout", null,{
            withCredentials: true
        }); 
        if(res.status === 200){
            return res;
        }
        return new Error("unable to logout");
    }
    const handleLogout = () => {
        sendlogoutRequest().then(() => dispatch(loginAction.logout()));
        alert("do you really want to logout")
    };

    useEffect(() => {
        dispatch(fetchTouristdetails())
      },[]);
    return(
        <>
            <header className="flex flex-row justify-between w-full p-4 shadow-lg shadow-gray-300 items-center">
                <h1 className="text-2xl font-bold uppercase text-gray-600">expl<span className="text-sky-500">ore</span></h1>
                    <div className="flex flex-row space-x-6 items-center">
                        {/* {tourist && <img src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(tourist.userimage.data.data)))}`} alt="no img found" className="rounded-full w-12 border-4 border-amber-500 bg-slate-100 object-cover aspect-square"/>} */}
                        {tourist && <h1 className="text-xl font-bold capitalize">{tourist.firstname}</h1>}
                        {isLoggedin && <Link className="uppercase text-3xl font-medium 
                        bg-red-600 rounded-lg text-white px-5 font-lightbold py-1 
                        uppercase text-center" onClick={handleLogout} to="/">o</Link> }
                    </div>     
            </header>
        </>
    )
}

export default LandingHead
