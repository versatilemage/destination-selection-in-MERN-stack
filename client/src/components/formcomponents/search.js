import {useSelector, useDispatch} from 'react-redux';

import { fetchClickedDestination } from '../../redux/click';

import { DestinationbyTitle } from '../../redux/findPlacebyTitle';

import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';

function Search () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState("")

    const onClicked = (e) => {
        dispatch(fetchClickedDestination(title || tags));
        navigate("/user")
    }

    return (
        <>
            <form className="flex flex-col space-y-5 shadow-lg shadow-slate-600 p-6 h-64 rounded-xl" on onSubmit={onClicked}>
                
                <input type="text"
                 placeholder="search *" 
                 className="py-2 px-4 border border-slate-400 
                 rounded-lg"
                 onChange={(e) => setTitle(e.target.value)}></input>

                <input type="text" 
                placeholder="search tags *" 
                className="py-2 px-4 border border-slate-400 
                rounded-lg"
                onChange={(e) => setTags(e.target.value)}></input>

                <button className="bg-blue-600 text-white py-3 
                px-4 rounded-xl" type='submit'>search</button>

            </form>
        </>
    )
}

export default Search
