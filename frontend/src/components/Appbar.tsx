import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-2">
        <div className="place-self-center cursor-pointer text-xl font-bold">
            <Link to={'/blogs'}>ByteBlog</Link>
        </div>
        <div>
            <Link to={'/publish'}>
                <button type="button" className="mr-4 focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 
                font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2">Post</button>
                <Avatar name = "Harshit" className="w-10 h-10"/>
            </Link>
        </div>
    </div>
}