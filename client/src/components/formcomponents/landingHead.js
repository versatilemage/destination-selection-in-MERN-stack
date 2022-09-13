import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';

import { fetchTouristdetails } from '../../redux/TouristDetails';

function LandingHead () {
    const dispatch = useDispatch()
    const {menu, loading} = useSelector((state) => state.TouristDetails);
    return(
        <>
            <header className="flex flex-row justify-between w-full p-4 shadow-lg shadow-gray-300">
            {menu.map((item) => {
                    const base64String = btoa(String.fromCharCode(...new Uint8Array(item.userimage.data.data)));
                        <div className="flex flex-row bg-red-100" key={item._id}>
                            <img src={`data:image/png;base64,${base64String}`} alt={`no images found`} className="rounded-full w-20 h-44 p-20 bg-red-600"/>
                            <h1>item.email</h1>
                        </div>
                })}
                <h1 className="text-2xl font-bold uppercase text-gray-600">expl<span className="text-sky-500">ore</span></h1>
                    <button className="uppercase text-xl font-medium bg-red-600 rounded-lg text-white px-3 font-lightbold py-1 uppercase">o</button>       
            </header>
        </>
    )
}

export default LandingHead
