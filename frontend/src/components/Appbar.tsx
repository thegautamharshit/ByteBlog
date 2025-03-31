
import { Link } from "react-router-dom";
import byteblog from '../assets/byteblog.png'
import { Notification } from "./Notification";
import { AvatarNameButton } from "./AvatarNameButton";

export const Appbar = () => {
    return (
      <div className="border-b flex justify-between px-10 py-2 items-center">
        {/* Left Section */}
        <div className="cursor-pointer text-xl font-bold">
          <Link to={'/blogs'}><img className="-mt-1 -mb-4" src={byteblog} /></Link>
        </div>
  
        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="-mb-2">
            <Notification />
          </div>
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
          <AvatarNameButton/>
        </div>
      </div>
    );
  };