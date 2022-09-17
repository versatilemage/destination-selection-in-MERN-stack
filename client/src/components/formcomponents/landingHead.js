import React, { useEffect} from 'react';

import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';

import { fetchTouristdetails } from '../../redux/TouristDetails';

axios.defaults.withCredentials = true

function LandingHead () {
    // const [user, setUser] = useState();
    const dispatch = useDispatch()
    const {tourist, loading} = useSelector((state) => state.TouristDetails);

    // const sendRequest = async() => {
    //     const res = await axios.get("http://localhost:6001/findtourist",{withCredentials: true})
    //     .catch(err => console.log(err))
    //     const datas = await res.data;
    //     return datas;
    //     // return await res.data
    //     // console.log(res.data)
    // }

    useEffect(() => {
        // sendRequest().then((data) => setUser(data.user))
        dispatch(fetchTouristdetails())
      },[]);
    return(
        <>
            <header className="flex flex-row justify-between w-full p-4 shadow-lg shadow-gray-300 items-center">
                <h1 className="text-2xl font-bold uppercase text-gray-600">expl<span className="text-sky-500">ore</span></h1>
                    <div className="flex flex-row space-x-6 items-center">
                        {/* {tourist && <img src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(tourist.userimage.data.data)))}`} alt="no img found" className="rounded-full w-12 border-4 border-amber-500 bg-slate-100 object-cover aspect-square"/>} */}
                        {tourist && <h1 className="text-xl font-bold capitalize">{tourist.firstname}</h1>}
                        <button className="uppercase text-3xl font-medium bg-red-600 rounded-lg text-white px-5 font-lightbold py-1 uppercase text-center">o</button>  
                    </div>     
            </header>
        </>
    )
}

export default LandingHead
