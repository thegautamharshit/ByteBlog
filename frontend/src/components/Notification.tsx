import { useState } from "react";

export const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showAll, setShowAll] = useState(false); // State to track "View all"

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleShowAll = () => {
        setShowAll(!showAll); // Toggle the "View all" state
    };

    // Example notifications data
    const notifications = [
        {
            id: 1,
            name: "Harshit Gautam",
            message: "Understanding React Hooks: A Beginner's Guide",
            time: "a few moments ago",
            image: "https://2.gravatar.com/avatar/fbdb83669414980fbb989e57de50bd11d369a972d3534e942ebaee787fc41927?size=256",
        },
        {
            id: 2,
            name: "Aravind",
            message: "10 Tips for Writing Clean and Maintainable Code",
            time: "10 minutes ago",
            image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
        },
        {
            id: 3,
            name: "Harry",
            message: "Mastering JavaScript: Advanced Concepts Explained",
            time: "30 minutes ago",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSECbl5nXDLY06vtviz776uZLJVQtjQJoKdWw&s",
        },
        {
            id: 4,
            name: "Michael Brown",
            message: "How to Build a Full-Stack Application with Next.js",
            time: "1 hour ago",
            image: "https://media.istockphoto.com/id/1318414954/photo/silhouette-image-young-woman-contemplating-against-blue-cloudy-sky.jpg?s=612x612&w=0&k=20&c=7dg4nAYxsJfuMeNpRmUn6UBS0JKXnJcvmECSQQZ0HMU=",
        },
    ];

    // Determine which notifications to show
    const visibleNotifications = showAll ? notifications : notifications.slice(0, 1);

    return (
        <div className="relative">
            {/* Notification Button */}
            <button
                id="dropdownNotificationButton"
                onClick={toggleDropdown}
                className="relative inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none"
                type="button"
            >
                <svg
                    className="w-7 h-7"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 14 20"
                >
                    <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                </svg>
                <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5"></div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    id="dropdownNotification"
                    className="absolute right-0 z-20 w-80 bg-white divide-y divide-gray-100 rounded-lg shadow-lg"
                    aria-labelledby="dropdownNotificationButton"
                >
                    <div className="block px-4 py-2 font-medium text-center text-gray-700 bg-gray-50 rounded-t-lg">
                        Notifications
                    </div>
                    <div className="divide-y divide-gray-100">
                        {/* Render notifications dynamically */}
                        {visibleNotifications.map((notification) => (
                            <a
                                key={notification.id}
                                href="#"
                                className="flex px-4 py-3 hover:bg-gray-100"
                            >
                                <div className="shrink-0">
                                    <img
                                        className="rounded-full w-11 h-11"
                                        src={notification.image}
                                        alt={`${notification.name} image`}
                                    />
                                </div>
                                <div className="w-full ps-3">
                                    <div className="text-gray-500 text-sm mb-1.5">
                                        New Blog from{" "}
                                        <span className="font-semibold text-gray-900">
                                            {notification.name}
                                        </span>
                                        : "{notification.message}"
                                    </div>
                                    <div className="text-xs text-blue-600">
                                        {notification.time}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                    <button
                        onClick={toggleShowAll}
                        className="block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-b-lg w-full"
                    >
                        <div className="inline-flex items-center">
                            <svg
                                className="w-4 h-4 me-2 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 14"
                            >
                                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                            </svg>
                            {showAll ? "Show less" : "View all"}
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
};