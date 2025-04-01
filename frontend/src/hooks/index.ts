import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface User {
    userName: string;
    userEmail: string;
}

export interface Post{
    "content" : any
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

export const useUser = () =>{
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/user`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            setUser(response.data);
            setLoading(false);
        })
        .catch((error)=>{
            console.error("Error fetching user info", error);
            setLoading(false);
        })
        .finally(()=>{
            setLoading(false)
        })

    },[]);

    return {user, loading};
}


export const useDeletePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deletePost = async (postId: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${postId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || "Failed to delete the post");
            }

            return true; // Indicate success
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "An error occurred");
            return false; // Indicate failure
        } finally {
            setIsLoading(false);
        }
    };

    return { deletePost, isLoading, error };
};
