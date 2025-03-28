import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



export const Publish = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [isLoading, setisLoding] = useState(false);
    const navigate = useNavigate();

    return <div>
        <div>
            <Appbar />
        </div>
        <div className="flex justify-center pt-10 ">
            <input onChange={(e) => {
                setTitle(e.target.value);
            }} type="text" 
            value={title} 
            placeholder="Title" 
            className="w-8/12 border-b text-4xl font-old text-gray-700 outline-none placeholder-slate-400 font-serif m-10"></input>
        </div>
        <div className="flex justify-center pt-10">
            <textarea onChange={(e) => {
                setContent(e.target.value);
            }} value={content}
             placeholder="Tell Your Story ...." 
             className="w-8/12 text-xl font-old text-gray-700 outline-none placeholder-slate-400 h-[350px]" />
        </div>
        <div>
            
        </div>
        <div className="flex justify-center pt-10">
            <button onClick={async()=>{
                setisLoding(true);
                try{
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content
                    },{
                        headers:{
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                } catch(e) {
                    console.error("Published failed", e);
                } finally{
                    setisLoding(false);
                }
                
            }} type="button" className={`mr-4 focus:outline-none text-white bg-green-600/90 hover:bg-green-700 focus:ring-4 focus:ring-green-300 
                    font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""} `}>{isLoading ? "Publishing..." : "Publish"}</button>
        </div>
    </div>
}
