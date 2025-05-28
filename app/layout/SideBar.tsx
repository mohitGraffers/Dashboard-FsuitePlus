"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { useState } from "react";

const navItems = [
    { label: "Dashboard", href: "/", icon: "📊" },
    { label: "Ticketing", href: "/ticketing", icon: "🎟️" },
    { label: "Checklist", href: "/checklist", icon: "✅" },
    { label: "Work Permit", href: "/work-permit", icon: "📝" },
    { label: "Gatepass", href: "/gatepass", icon: "🚪" },
    { label: "Feedback", href: "/feedback", icon: "💬" },
    { label: "Asset Management", href: "/asset", icon: "💼" },
    { label: "Visitor System", href: "/visitor", icon: "👥" },
    { label: "Fitout", href: "/fitout", icon: "🛠️" },
    { label: "Masters", href: "/masters", icon: "📚" },
];

export const Sidebar = ({ setIsOpen, isOpen }: { setIsOpen: any, isOpen: any }) => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    // const [isOpen, setIsOpen] = useState(false);

    const handleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    const toggleSidebar = () => setIsOpen(!isOpen);
    console.log("isCollapsed", isCollapsed);
    return (
        <>
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-40  bg-[#0C2340] text-white p-4 space-y-4 transition-all duration-300",
                    "transform md:translate-x-0 md:static md:block",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    isCollapsed ? "w-30" : "w-64"
                )}
            >
                <div className="border-b border-gray-800 flex items-center justify-between p-5">
                    <div className="flex items-center">
                        {/* <img src="/logo.png" alt="logo" className="w-12 h-6 rounded-full" /> */}
                        {/* <text className="text-xl font-bold">Fsuite Plus</text> */}
                        {!isCollapsed && (
                            <span className="text-xl font-bold whitespace-nowrap">Fsuite Plus</span>
                        )}
                    </div>

                    <button className="hidden md:block" onClick={handleCollapse}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Close Button inside Sidebar (mobile only) */}
                    <div className="flex justify-end md:hidden">
                        <button onClick={toggleSidebar} aria-label="Close Sidebar">
                            <div className="w-6 h-0.5 bg-white rotate-45 translate-y-1" />
                            <div className="w-6 h-0.5 bg-white -rotate-45 -translate-y-1" />
                        </button>
                    </div>
                </div>

                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center px-4 py-2 rounded-md transition-colors",
                                "hover:bg-white/10",
                                isActive && "bg-white/10"
                            )}
                            onClick={() => setIsOpen(false)} // close on click (mobile)
                        >
                            <span className="mr-3 text-lg">{item.icon}</span>
                            {/* <span>{item.label}</span> */}
                            {!isCollapsed && <span className="ml-3">{item.label}</span>}

                        </Link>
                    );
                })}
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};
