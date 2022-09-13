import axios from "axios"

import { useState } from "react";

import { useNavigate } from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';

function CreateDestinations () {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState("")
    const [message, setMessage] = useState("")
    const [file, setFile] = useState("")

    console.log(title, tags, message, file)

    const HandleChanges = async(e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("title", title);
        formdata.append("tags", tags);
        formdata.append("message", message);
        formdata.append("image", file);

        const config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }

        await axios.post(`http://localhost:6001/newdestination`, formdata, config)
    }

    const handleFile = (e) => { 
        setFile(e.target.files[0]);
    }

    return (
        <>
            <form className="flex flex-col space-y-5 shadow-lg shadow-slate-600 p-6 h-[35em] rounded-xl">
                
                <h1 className="text-xl font-bold capitalize text-center">create a explore</h1>
                
                <input type="text" placeholder="Title *" 
                className="py-2 px-4 border border-slate-400 rounded-lg"
                onChange={(e) => setTitle(e.target.value)}>
                </input>

                <textarea type="text" placeholder="Message" 
                className="py-2 px-4 border border-slate-400 rounded-lg h-28"
                onChange={(e) => setMessage(e.target.value)}>
                </textarea>

                <input type="text" placeholder="Tags *" 
                className="py-2 px-4 border border-slate-400 rounded-lg"
                onChange={(e) => setTags(e.target.value)}>
                </input>

                <input type="file" className="w-3/4"
                onChange={handleFile}></input>
                <p className="text-red-600 capitalize"><strong 
                className="text-black capitalize">
                note: </strong>file should not exceed 100kb</p>

                <button className="bg-blue-700 text-white py-3 rounded-xl" type="submit" onClick={HandleChanges}>submit</button>
                
                <button className="bg-red-600 text-white py-2 rounded-xl">clear</button>
            
            </form>
        </>
    )
}

export default CreateDestinations
