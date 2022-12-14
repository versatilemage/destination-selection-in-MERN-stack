import FormHeader from "./formheader"

import { useNavigate } from 'react-router-dom';

import {useDispatch} from 'react-redux';

import {Link} from "react-router-dom"

import { useState } from "react";

import { loginAction } from '../redux/loginStatus';

import axios from "axios";

function Login () {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const[emails, setemail] = useState("")
    const [passwords, setPassword] = useState("")

    const homepage = async() => {
        const res = await axios.post("http://localhost:6001/login",{
            email: emails,
            password: passwords
        }).catch((err) => console.log(err,"login error"))
        const datas = await res.data;
        return datas
    }

    const handleForm = (e) => {
        e.preventDefault()
        homepage()
        .then(() => dispatch(loginAction.login()))
        .then(() => navigate("/home"))
        console.log("login is working",loginAction.login())
    }

    return (
        <>
            <FormHeader/>
            <div className="flex flex-row justify-center h-[35em] items-center">
                
                <form className="flex flex-col w-2/6 h-84 px-5 py-8 rounded-lg space-y-3 shadow-lg shadow-slate-500"
                onSubmit={handleForm}>
                    
                    <span className="bg-violet-500 rounded-full p-5 self-center"></span>
                    
                    <input type="email" placeholder="Email Address *" 
                    className="border border-slate-400 rounded-sm px-4 py-3 
                    text-justify rounded-lg"
                    onChange={(e) => setemail(e.target.value)}></input>

                    <input type="password" placeholder="password *" 
                    className="border border-slate-400 rounded-sm px-4 py-3 
                    text-justify rounded-lg"
                    onChange={(e) => setPassword(e.target.value)}></input>
                    
                    <button className="text-xl uppercase bg-blue-600 rounded-lg text-white px-4 py-3 w-full self-center" type="submit">login</button>
                    
                    <p className="text-lg text-slate-900 self-center font-bold">Don???t have an account? <Link className="text-xl text-blue-600" to="/signup">SIGN UP</Link></p>
                
                </form>
            
            </div>
        </>
    )
}

export default Login
