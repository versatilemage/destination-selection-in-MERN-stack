import React, { useEffect, useState} from 'react';

import axios from 'axios';

// import {useSelector, useDispatch} from 'react-redux';

// import { fetchTouristdetails } from '../../redux/TouristDetails';

axios.defaults.withCredentials = true

function LandingHead () {
    const [user, setUser] = useState();
    // const dispatch = useDispatch()
    // const {menu, loading} = useSelector((state) => state.TouristDetails);

    const sendRequest = async() => {
        const res = await axios.get("http://localhost:6001/findtourist",{withCredentials: true})
        .catch(err => console.log(err))
        const datas = await res.data;
        return datas;
        // return await res.data
        // console.log(res.data)
    }

    useEffect(() => {
        sendRequest().then((data) => setUser(data.user))
        // dispatch(fetchTouristdetails())
      },[]);
    //   console.log(menu)
    return(
        <>
            <header className="flex flex-row justify-between w-full p-4 shadow-lg shadow-gray-300">
            {/* {user &&
                    // const base64String = btoa(String.fromCharCode(...new Uint8Array(user.userimage.data.data)));
                        <div className="flex flex-row bg-red-100">
                            <img src={`data:image/png;base64,${base64String}`} alt={`no images found`} className="rounded-full w-20 h-44 p-20 bg-red-600"/>
                            <h1>{user.email}</h1>
                        </div>} */}
                <h1 className="text-2xl font-bold uppercase text-gray-600">expl<span className="text-sky-500">ore</span></h1>
                {user && <h1 className="bg-red-200 p-6">{user.firstname}</h1>}
                <h2>hello</h2>
                    <button className="uppercase text-xl font-medium bg-red-600 rounded-lg text-white px-3 font-lightbold py-1 uppercase">o</button>       
            </header>
        </>
    )
}

export default LandingHead
