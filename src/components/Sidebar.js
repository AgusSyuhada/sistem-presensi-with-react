import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ open, setOpen, menuList = [], activeMenu = "" }) {
    const renderNavItem = (menu) =>
        menu.key === activeMenu ? (
            <button
                key={menu.key}
                className="flex items-center px-4 py-2 text-white bg-[#4caf50] rounded-lg shadow-sm w-full cursor-default"
                tabIndex={-1}
                type="button"
            >
                <span className="material-icons mr-3">{menu.icon}</span>
                {menu.label}
            </button>
        ) : (
            <Link
                key={menu.key}
                to={menu.href}
                className="flex items-center px-4 py-2 text-black hover:bg-[#4caf50] hover:text-white rounded-lg"
                onClick={() => setOpen(false)}
            >
                <span className="material-icons mr-3">{menu.icon}</span>
                {menu.label}
            </Link>
        );

    return (
        <>
            <aside
                className={`
          fixed md:static inset-y-0 left-0 z-30 w-64 bg-[#D7F8E5] flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
                id="sidebar"
            >
                <div className="bg-[#4caf50] h-16 flex items-center justify-between px-4 text-white md:hidden">
                    <span className="font-bold">MI AL FAIZEIN</span>
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setOpen(false)}
                        aria-label="Tutup sidebar"
                        type="button"
                    >
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <nav className="flex-1 p-6 space-y-2">
                    {menuList.map(renderNavItem)}
                </nav>
                <div className="p-6">
                    <Link
                        className="flex items-center px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                        to="/login"
                        onClick={() => setOpen(false)}
                    >
                        <span className="material-icons mr-3">logout</span>
                        Keluar
                    </Link>
                </div>
            </aside>
            <div
                id="overlay"
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity ${open ? "" : "hidden"
                    }`}
                onClick={() => setOpen(false)}
            />
        </>
    );
}