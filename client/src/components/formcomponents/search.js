import {useSelector, useDispatch} from 'react-redux';

import { DestinationbyTitle } from '../../redux/findPlacebyTitle';

import { useNavigate } from 'react-router-dom';

import React from 'react';

function Search () {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const state = useSelector((state) => state);
    const menu = state['byTitle']['menu'];
    const loading = state['byTitle']['loading'];

    return (
        <>
            <form className="flex flex-col space-y-5 shadow-lg shadow-slate-600 p-6 h-64 rounded-xl">
                
                <input type="text"
                 placeholder="search *" 
                 className="py-2 px-4 border border-slate-400 
                 rounded-lg"></input>

                <input type="text" 
                placeholder="search tags *" 
                className="py-2 px-4 border border-slate-400 
                rounded-lg"></input>

                <button className="bg-blue-600 text-white py-3 
                px-4 rounded-xl">search</button>

            </form>
        </>
    )
}

export default Search
