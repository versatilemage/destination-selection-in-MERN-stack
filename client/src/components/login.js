import FormHeader from "./formheader"

import { useNavigate } from 'react-router-dom';

import { useState } from "react";

import axios from "axios";

function Login () {

    const navigate = useNavigate()

    const[email, setemail] = useState("");
    const[password, setPassword] = useState("")

    const nextpage = (e) => {
        navigate("/signup")
    }

    const homepage = async(e) => {
        const res = axios.post("http://localhost:6001/login",{
            email: email,
            password: password
        })
        // navigate("/home")
        const data = await res.data;
        return data
    }

    const handleForm = (e) => {
        e.preventDefault()
        homepage().then(() => navigate("/home"))
    }

    return (
        <>
            <FormHeader/>
            <div className="flex flex-row justify-center h-[35em] items-center" onSubmit={handleForm}>
                
                <form className="flex flex-col w-2/6 h-84 px-5 py-8 rounded-lg space-y-3 shadow-lg shadow-slate-500">
                    
                    <span className="bg-violet-500 rounded-full p-5 self-center"></span>
                    
                    <input type="email" placeholder="Email Address *" 
                    className="border border-slate-400 rounded-sm px-4 py-3 
                    text-justify rounded-lg"
                    onChange={(e) => setemail(e.target.value)}></input>

                    <input type="password" placeholder="password *" 
                    className="border border-slate-400 rounded-sm px-4 py-3 
                    text-justify rounded-lg"
                    onChange={(e) => setPassword(e.target.value)}></input>
                    
                    <button className="text-xl uppercase bg-blue-600 rounded-lg text-white px-4 py-3 w-full self-center">login</button>
                    
                    <p className="text-lg text-slate-900 self-center font-bold">Don’t have an account? <button className="text-xl text-blue-600"
                    onClick={nextpage}>SIGN UP</button></p>
                
                </form>
            
            </div>
        </>
    )
}

export default Login
