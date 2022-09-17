import React, { useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux'

import { fetchTouristdetails } from '../redux/TouristDetails';

function Trail () {
    const dispatch = useDispatch();
    const {loading, tourist} = useSelector((state) => state.TouristDetails)

    useEffect(() => {
        dispatch(fetchTouristdetails())
    },[])

    return (
        <>
        {loading && <div className="bg-img-loader p-56 mt-5 bg-no-repeat"></div>}
        {tourist && <h1>{tourist.firstname}</h1>}
        </>
    )
}

export default Trail
