// import Alt from "./userpic"

function Landing () {
    return (
        <>
            <header className="flex flex-row justify-between w-full p-4 shadow-lg shadow-gray-300">
                <h1 className="text-2xl font-bold uppercase text-gray-600">expl<span className="text-sky-500">ore</span></h1>
                <div className="flex flex-row space-x-4">
                    <img src={``} alt="" className="rounded-full p-5 bg-violet-700"/>
                    <button className="uppercase text-xl font-medium bg-blue-600 rounded-lg text-white px-3 py-1">sign in</button>
                </div>
            </header>

            <div className="grid grid-cols-[1100px_minmax(10px,_1fr)_0px] w-full">
                <div className="bg-red-100 grid grid-cols-4 space-x-4">
                </div>
                <div className="py-10 items-center justify-center justify-between space-y-6 px-2">
                    <form className="flex flex-col space-y-5 shadow-lg shadow-slate-600 p-6 h-64 rounded-xl">
                        <input type="text" placeholder="search *" className="py-2 px-4 border border-slate-400 rounded-lg"></input>
                        <input type="text" placeholder="search tags *" className="py-2 px-4 border border-slate-400 rounded-lg"></input>
                        <button className="bg-blue-600 text-white py-3 px-4 rounded-xl">search</button>
                    </form>
                    <form className="flex flex-col space-y-5 shadow-lg shadow-slate-600 p-6 h-[35em] rounded-xl">
                        <h1 className="text-xl font-bold capitalize text-center">create a explore</h1>
                        <input type="text" placeholder="Title *" className="py-2 px-4 border border-slate-400 rounded-lg"></input>
                        <textarea type="text" placeholder="Message" className="py-2 px-4 border border-slate-400 rounded-lg h-28"></textarea>
                        <input type="text" placeholder="Tags *" className="py-2 px-4 border border-slate-400 rounded-lg"></input>
                        <input type="file" className="w-3/4"></input>
                        <button className="bg-blue-700 text-white py-3 rounded-xl">submit</button>
                        <button className="bg-red-600 text-white py-2 rounded-xl">clear</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Landing