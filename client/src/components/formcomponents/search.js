import {useSelector, useDispatch} from 'react-redux';

import { fetchClickedDestination } from '../../redux/click';

import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';

function Search () {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const state = useSelector((state) => state);
    // const menu = state['byTitle']['menu'];
    // const loading = state['byTitle']['loading'];
    // const [title, setTitle] = useState("")
    // const [tags, setTags] = useState("")

    // useEffect(() => {
    //     dispatch(fetchClickedDestination())
    // },[])

    const onClicked = (e) => {
        dispatch(fetchClickedDestination(e.target.elements[0].value));
        e.target.elements[0].value = '';
        navigate("/user")
    }

    return (
        <>
            <form className="flex flex-col space-y-5 shadow-lg shadow-slate-600 p-6 h-64 rounded-xl" on onSubmit={onClicked}>
                
                <input type="text"
                 placeholder="search *" 
                 className="py-2 px-4 border border-slate-400 
                 rounded-lg"></input>

                {/* <input type="text" 
                placeholder="search tags *" 
                className="py-2 px-4 border border-slate-400 
                rounded-lg"></input> */}

                <button className="bg-blue-600 text-white py-3 
                px-4 rounded-xl" type='submit'>search</button>

            </form>
        </>
    )
}

export default Search
