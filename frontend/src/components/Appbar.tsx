import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return (
      <div className="border-b flex justify-between px-10 py-2 items-center">
        {/* Left Section */}
        <div className="cursor-pointer text-xl font-bold">
          <Link to={'/blogs'}>ByteBlog</Link>
        </div>
  
        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Post Button */}
          <Link to={'/publish'}>
            <button 
              type="button" 
              className="focus:outline-none text-white bg-green-600 
                         hover:bg-green-700 focus:ring-4 focus:ring-green-300 
                         font-medium rounded-full text-sm px-5 py-2.5"
            >
              Post
            </button>
          </Link>
  
          {/* Avatar */}
          <Avatar name="Harshit" className="w-10 h-10" />
        </div>
      </div>
    );
  };