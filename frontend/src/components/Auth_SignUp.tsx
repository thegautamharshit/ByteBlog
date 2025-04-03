import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { registerSchema } from "@thegautamharshit/blog-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type}:{type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [postInputs, setpostInputs] = useState<registerSchema>({
        name: "",
        email:"",
        confirmPassword:"",
        password: ""
    });

    async function sendRequest(){
        setIsLoading(true);
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
            const jwt = response.data.jwt; 
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        }catch (e){
            alert("Error while Signing Up");
            console.error("Signup error:", e);
        }finally{
            setIsLoading(false)
        }
    }    

    return <div className="h-screen flex justify-center flex-col">
        {/* {JSON.stringify(postInputs)} */}
        <div className="flex justify-center">
            <div>
                <div className="text-3xl font-bold">
                    Create an Account
                </div>
                <div className="text-slate-500 text-center">
                    {type === "signin" ? "Don't have an account ?" : "Already have an account ? "}
                    <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                    {type === "signup" ? "Sign In":"Sign Up"}</Link>
                </div>
            </div>
        </div>
        <div className="flex-col ">
            <div className="w-80 place-self-center">
                <LabelledInput label="Name" placeholder="Harshit Gautam" onChange={(e)=>{
                setpostInputs({
                    ...postInputs,
                    name:e.target.value
                })
                }} />
                <LabelledInput label="Email" placeholder="thegautamharshit@gmail.com" onChange={(e)=>{
                    setpostInputs({
                        ...postInputs,
                        email:e.target.value.toLowerCase()
                    })
                }} />
                <LabelledInput label="Password" type="password" placeholder="#0123@abc?/" onChange={(e)=>{
                    setpostInputs({
                        ...postInputs,
                        password:e.target.value
                    })
                }}/>
                <LabelledInput label="Confirm Password" type="password" placeholder="#0123@abc?/" onChange={(e)=>{
                    setpostInputs({
                        ...postInputs,
                        confirmPassword:e.target.value
                    })
                }} />
                <div className="pt-10">
                    <button onClick={sendRequest} type="button" className={`w-full text-white bg-gray-800 hover:bg-gray-900 font-medium text-sm py-2.5 mb-2 rounded-md ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>{isLoading ? "Signing Up" : "Sign Up"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({label, type, placeholder, onChange}:LabelledInputType){
    return <div>
        <div className="pt-5">
            <p className="text-xl ">{label}</p>
            <input type={type || "text"} name="Username" className="w-full border border-gray-300 shadow-xl pt-2 text-center text-gray-900 text-sm  " placeholder={placeholder} onChange={onChange}/>
        </div>
    </div>
}