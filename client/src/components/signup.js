import FormHeader from "./formheader"
import { useNavigate } from 'react-router-dom';

function Signup () {
    const navigate = useNavigate()
    const nextpage = (e) => {
        navigate("/")
    }
    return (
        <>
            <FormHeader/>
            <div className="flex flex-row justify-center h-[35em] items-center">
                <form className="flex flex-col w-2/6 h-84 px-5 py-8 rounded-lg space-y-3 shadow-lg shadow-slate-500">
                    <span className="bg-violet-500 rounded-full p-5 self-center"></span>
                    <div className="flex flex-row justify-between">
                    <input type="email" placeholder="First name *" className="border border-slate-400 rounded-sm px-4 py-3 
                    text-justify rounded-lg"></input>
                    <input type="password" placeholder="Last name *" className="border border-slate-400 rounded-sm px-4 py-3 
                    text-justify rounded-lg"></input>
                    </div>
                    <input type="email" placeholder="Email Address *" className="border border-slate-400 rounded-sm px-4 py-3 
                    text-justify rounded-lg"></input>
                    <input type="password" placeholder="password *" className="border border-slate-400 rounded-sm px-4 py-3 
                    text-justify rounded-lg"></input>
                    <button className="text-xl uppercase bg-blue-600 rounded-lg text-white px-4 py-3 w-full self-center" onClick={nextpage}>sign up</button>
                    <p className="text-lg text-slate-900 self-center font-bold">Already a user <button className="text-xl text-blue-600"
                    onClick={nextpage}>SIGN IN</button></p>
                </form>
            </div>
        </>
    )
}

export default Signup
