import { useState, useEffect, useRef } from "react";
import { useUser } from "../hooks";
import { useLocation, useNavigate} from "react-router-dom";

export const AvatarNameButton = () => {
  const { user, loading} = useUser();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

    const displayName = isAuthPage ? (
        <button
          onClick={() => {
            navigate(location.pathname === "/signin" ? "/signup" : "/signin");
          }}
          className="hover:underline font-medium"
        >
          {location.pathname === "/signin" ? "Sign Up" : "Sign In"}
        </button>
      ) : loading ? (
        <div className="text-slate-400 font-thin">User Name</div>
      ) : (
        user?.userName
      );

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside the container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={toggleDropdown}
        id="dropdownAvatarNameButton"
        className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 md:me-0 focus:ring-4 focus:ring-gray-100"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-10 h-10 me-2 rounded-full"
          src="https://2.gravatar.com/avatar/fbdb83669414980fbb989e57de50bd11d369a972d3534e942ebaee787fc41927?size=256"
          alt="user photo"
        />
        <div className="text-base text-slate-700 font-normal">{displayName}</div>
        <div>{isAuthPage ? "" : <div><svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg></div> }</div>
      </button>

      {/* Dropdown Menu: Absolutely positioned */}
      <div
        id="dropdownAvatarName"
        className={`absolute top-full right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm transition-all z-10 ${
          dropdownOpen ? "block" : "hidden"
        }`}
      >
        <div>{isAuthPage ? <div></div> : <div>
        <div className="px-4 py-3 text-sm text-gray-900">
          <div className="font-medium">{isAuthPage ? "" : `Pro User`}</div>
          <div className="truncate">{!user ? "" : user.userEmail}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownAvatarNameButton"
        >
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Settings
            </a>
          </li>
        </ul>
        <div className="py-2">
          <a onClick={() => {
            localStorage.clear();
            navigate("/signin")
          }}
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </a>
        </div></div> }</div>

      </div>
    </div>
  );
};
