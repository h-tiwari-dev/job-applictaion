import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "./features/Auth/hooks/useAuth";
import { useEffect, useState } from "react";


export const Layout = function () {
    const navigate = useNavigate();
    const { authUser, logout } = useAuth();
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        console.log("AUTH USER CHANGED", authUser);
    }, [authUser]);
    const handleLogout = () => {
        // Handle the logout action and redirect the user as needed
        logout();
        navigate('/login');
    };

    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Main Content Area */}
            <main className="w-full p-4">
                {/* Header */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    {/* Left side of the header with the title */}
                    <h1 className="text-3xl font-semibold">Job Listings</h1>

                    {/* Right side of the header with login functionality */}
                    <div className="relative">
                        {!authUser ? (
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                            >
                                Log In
                            </button>
                        ) : (
                            <div className="group">
                                <button
                                    onClick={toggleMenu}
                                    className="group flex items-center outline-none focus:outline-none"
                                >
                                    <span className="mr-2">{authUser.name}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-600 group-hover:text-gray-800"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.293 5.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L12 7.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                {isMenuOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div
                                            className="py-1"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="options-menu"
                                        >
                                            <button
                                                onClick={handleLogout}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                role="menuitem"
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </header>

                {/* Content */}
                <div className="p-4">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};