import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";
import Dropdown from "./ui/Dropdown";
import { useState } from "react";
import { useRef } from "react";
import { MenuDashboardValidate } from "@/Layouts/libs/LibSidebar";

export default function Navbar({ user }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    // Menutup dropdown ketika pengguna mengklik di luar area dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                closeDropdown();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const [scroll, setScroll] = React.useState(0);
    const scrollToTop = () => {
        const datascroll = window.scrollY;
        return datascroll > 0 ? setScroll(datascroll) : setScroll(0);
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollToTop);
        return () => {
            window.removeEventListener("scroll", scrollToTop);
        };
    }, []);

    const MenuDashboard = MenuDashboardValidate(user);
    const path = window.location.pathname; // Mendapatkan path dari URL
    let relevantPath; // Variabel untuk menyimpan hasil path yang relevan

    // Memeriksa apakah ada data di path
    if (path.includes("/") && path.split("/").length > 2) {
        const segments = path.split("/"); // Membagi path menjadi segmen menggunakan '/'
        relevantPath = `/${segments[1]}/${segments[2]}`; // Mengambil dua segmen pertama setelah domain
    } else {
        relevantPath = window.location.pathname; // Jika tidak ada data di path, gunakan path utuh
    }

    return (
        <nav
            className={`w-full  backdrop-blur-md shadow-sm  lg:px-[5rem] px-0 mt-0 top-0 z-50 transition-all duration-180 ease-in-out ${
                scroll > 0 ? "bg-teal-600 static" : "bg-teal-600/70 sticky"
            }`}
        >
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] py-2 px-6 shadow bg-gray-400 rounded-sm w-[15rem]"
                        >
                            {MenuDashboard &&
                                MenuDashboard.map((menu, index) => (
                                    <li>
                                        <Link
                                            href={menu.url}
                                            className={`font-medium text-md font-poppins ${
                                                menu.url ===
                                                window.location.pathname
                                                    ? " border-b-white border-b rounded-sm px-2 text-white"
                                                    : "text-gray-700 rounded-sm px-2"
                                            }`}
                                        >
                                            {menu.name}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <Link href="/">
                        <div className="flex flex-row gap-5">
                            <img
                                src={
                                    window.location.origin +
                                    "/logo_univ.png"
                                }
                                alt=""
                                className="h-[5rem] w-[4.5rem]"
                            />
                            <div className="flex flex-col gap-2 justify-center">
                                <h1 className="text-md text-white">
                                    Sistem Informasi Akademik
                                </h1>
                                <h1 className="text-xl font-bold text-white">
                                    Universitas Pembangunan Jaya
                                </h1>
                            </div>
                        </div>
                    </Link>
                </div>{" "}
                {user ? (
                    <div className="sm:hidden flex sm:items-center sm:ml-6 p-0 navbar-end">
                        <div className=" relative p-0">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <label
                                        tabIndex={0}
                                        className="btn btn-ghost btn-circle avatar"
                                    >
                                        <div className="w-10 rounded-full">
                                            <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.webp" />
                                        </div>
                                    </label>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                ) : (
                    <Link
                        href={route("login")}
                        className="sm:hidden flex text-lg font-semibold"
                    >
                        Login
                    </Link>
                )}
                <div className="navbar-end hidden  lg:flex">
                    <ul className="menu menu-horizontal px-1 ">
                        <li>
                            {user ? (
                                <div className="hidden sm:flex sm:items-center sm:ml-6 p-0">
                                    <div className=" relative p-0">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <label
                                                    tabIndex={0}
                                                    className="btn btn-ghost btn-circle avatar"
                                                >
                                                    {/* name */}

                                                    <i className="fas fa-user-circle text-3xl text-white"></i>
                                                </label>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={route("login")}
                                    className="ml-5 hidden sm:flex text-lg font-semibold text-gray-700 border-4 rounded-lg underline "
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full ">
                <ul className="menu menu-horizontal px-1 space-x-3">
                    {MenuDashboard &&
                        MenuDashboard.map((menu, index) => (
                            <li>
                                <Link
                                    href={menu.url}
                                    className={`font-medium text-md font-poppins hover:text-gray-200 ${
                                        menu.url === window.location.pathname
                                            ? " border-b-white border-b rounded-sm px-2 text-white"
                                            : "text-gray-700 rounded-sm px-2"
                                    }`}
                                >
                                    {menu.name}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </nav>
    );
}

/* <li tabIndex={0}>
                        <details>
                            <summary className=" font-medium text-xl">
                                Type
                            </summary>
                            <ul className="p-2 z-[1200] bg-wgite shadow-lg rounded-lg w-[12rem] ">
                                <li>
                                    <Link
                                        href={`/upload-laporan`}
                                        className={`font-medium text-xl px-1 py-2 rounded-sm ${
                                            "/upload-laporan" ===
                                            window.location.pathname
                                                ? " border-b-white border-b rounded-sm px-2 text-white"
                                                : "text-gray-700 rounded-sm"
                                        }`}
                                    >
                                        Upload Laporan
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/history-laporan`}
                                        className={`font-medium text-xl px-1 py-2 rounded-sm ${
                                            "/history-laporan" ===
                                            window.location.pathname
                                                ? " border-b-white border-b rounded-sm px-2 text-white"
                                                : "text-gray-700 rounded-sm"
                                        }`}
                                    >
                                        History Laporan
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/konsultasi`}
                                        className={`font-medium text-xl px-1 py-2 rounded-sm ${
                                            "/konsultasi" ===
                                            window.location.pathname
                                                ? " border-b-white border-b rounded-sm px-2 text-white"
                                                : "text-gray-700 rounded-sm"
                                        }`}
                                    >
                                        Konsultasi
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/chat`}
                                        className={`font-medium text-xl px-1 py-2 rounded-sm ${
                                            "/chat" === window.location.pathname
                                                ? " border-b-white border-b rounded-sm px-2 text-white"
                                                : "text-gray-700 rounded-sm"
                                        }`}
                                    >
                                        Chat
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li> */
