import React, { useEffect, useState} from 'react';

import axios from 'axios';

axios.defaults.withCredentials = true;

function Userpage () {
    const [user, setUser] = useState();

    const sendingRequest = async() => {
        const res = await axios.get("http://localhost:6001/findtourist", {
            withCredentials: true
        })
        .catch(err => console.log(err))

        const data = await res.data;
        return data;
    }

    useEffect(() => {
        sendingRequest().then((data) => setUser(data.user))
      },[]);

    return (
        <>
            <div>
            {user && <h1 className="bg-red-200 p-6">{user.firstname}</h1>}
            <h1>userpage</h1>
            </div>
        </>
    )
}

export default Userpage
