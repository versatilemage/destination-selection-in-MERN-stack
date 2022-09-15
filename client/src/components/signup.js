import FormHeader from "./formheader"

import axios from "axios";

import { useNavigate } from 'react-router-dom';

import {Link} from "react-router-dom"

import { useState } from "react";

// import {useSelector, useDispatch} from 'react-redux';

// import { fetchTouristdetails } from '../redux/TouristDetails';

function Signup () {
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const [firstname, setFname] = useState("")
    const [lastname, setLname] = useState("")
    const [mail, setmail] = useState("")
    const [password, setpassword] = useState("")
    const [image, setImage] = useState("")
    const nextpage = async(e) => {
        const formdata = new FormData()
        formdata.append("firstname", firstname);
        formdata.append("lastname", lastname);
        formdata.append("email", mail);
        formdata.append("password", password);
        formdata.append("userimage", image);
        const config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
          await axios.post(`http://localhost:6001/createuser`, formdata, config)
        //   dispatch(fetchTouristdetails(mail))
    }

    const formHandle = (e) => {
        e.preventDefault()
        nextpage().then(() => navigate("/"))
    }

    const handleProfileimg = (e) => { 
        setImage(e.target.files[0]);
    }

    return (
        <>
            <FormHeader/>
            <div className="flex flex-row justify-center h-[35em] items-center">
                <form className="flex flex-col w-2/6 h-84 px-5 py-8 rounded-lg space-y-3 shadow-lg shadow-slate-500" onSubmit={formHandle}>
                    <span className="bg-violet-500 rounded-full p-5 self-center"></span>
                    <div className="flex flex-row justify-between">
                    <input type="text" placeholder="First name *" className="border border-slate-400 rounded-sm px-4 py-3 
                    text-justify rounded-lg" onChange={(e) => setFname(e.target.value)}></input>
                    <input type="text" placeholder="Last name *" className="border border-slate-400 rounded-sm px-4 py-3 
                    text-justify rounded-lg" onChange={(e) => setLname(e.target.value)}></input>
                    </div>
                    <input type="email" placeholder="Email Address *" className="border border-slate-400 rounded-sm px-4 py-3 
                    text-justify rounded-lg" onChange={(e) => setmail(e.target.value)}></input>
                    <input type="password" placeholder="password *" className="border border-slate-400 rounded-sm px-4 py-3 
                    text-justify rounded-lg"  onChange={(e) => setpassword(e.target.value)}></input>
                    <label className="text-lg font-bold capitalize">Add Profile picture</label>
                    <input type="file" className="w-3/4" onChange={handleProfileimg}></input>
                    <p className="text-red-600 capitalize"><strong className="text-black capitalize">note: </strong>file should not exceed 50kb</p>
                    <button className="text-xl uppercase bg-blue-600 rounded-lg text-white px-4 py-3 w-full self-center" type="submit">sign up</button>
                    <p className="text-lg text-slate-900 self-center font-bold">Already a user <Link className="text-xl text-blue-600" to="/">SIGN IN</Link></p>
                </form>
            </div>
        </>
    )
}

export default Signup
