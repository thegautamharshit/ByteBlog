import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Post{
    "content" : Record<string, any>
    "title" : string;
    "id" : string;
    "author": {
        "name": string
    }
    "createdAt" : string
}

export const useBlog = ({ id }: { id : string }) =>{ 
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<Post>();

    useEffect(()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response =>{
                setPost(response.data.post);
                setLoading(false);
        }) .catch(error=>{
            console.error("Fetch Erro :",error);
            setLoading(false);
        })
    },[id])

    return {
        loading,
        post
    }
} 

export const useBlogs = () =>{
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setPosts(response.data.posts);
                setLoading(false);
        })  .catch(error=>{
            console.error("Fetch Erro :",error);
            setLoading(false);
        })
    }, [])

    return {
        loading,
        posts
    }
}