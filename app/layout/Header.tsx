export function Header({ setIsOpen, isOpen }: { setIsOpen: any, isOpen: any }) {
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <header className="bg-[#0C2340] text-white flex justify-between items-center px-4 py-5 shadow">
            {/* Left side - Avatar and Name */}

            {/* Hamburger Icon - only visible on mobile */}
            <button className="block sm:hidden" onClick={toggleSidebar}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <div className="flex items-center space-x-3 ml-auto mr-4">

                {/* Avatar */}
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-xl shrink-0 ml-4 sm:ml-0">
                    VK
                </div>

                {/* Name and Last Seen - hide on small screens */}
                <div className="hidden sm:block">
                    <p className="font-semibold">Vinayak Kurri</p>
                    <p className="text-sm text-gray-300">Last seen : 26/05/2025 3:20:05 PM</p>
                </div>
            </div>

            {/* Right side - Action icons */}
            <div className="flex items-center space-x-4">
                <button>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>
                <button>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                <button>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
