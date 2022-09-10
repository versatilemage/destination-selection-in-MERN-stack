import { useNavigate } from 'react-router-dom';

function FormHeader () {
    const navigate = useNavigate()
    const nextpage = (e) => {
        navigate("/")
    }
    return (
        <>
            <header className="flex flex-row justify-between w-full p-4 shadow-lg shadow-gray-300">
                <h1 className="text-2xl font-bold uppercase text-gray-600">expl<span className="text-sky-500">ore</span></h1>
                <button className="uppercase text-xl font-medium bg-blue-600 rounded-lg text-white px-3 py-1" onChange={nextpage}>sign in</button>
            </header>
        </>
    )
}

export default FormHeader