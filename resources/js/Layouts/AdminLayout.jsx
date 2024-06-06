import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
import { MenuDashboardValidate } from "./libs/LibSidebar";

export default function AdminLayout({ children }) {
    const { props } = usePage();
    const user = props.auth.user;
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
        <body className="m-0 font-sans text-base antialiased font-normal dark:bg-slate-900 leading-default bg-gray-50 text-slate-500">
            {props.title && <Head title={props.title} />}
            <div className="absolute w-full bg-gradient-to-b from-teal-200 to-teal-400 -mt-2 min-h-[45vh]" />
            <aside
                aria-expanded="false"
                className="fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl dark:shadow-none dark:bg-slate-850 max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0 z-50"
            >
                <div className="h-19">
                    <i
                        className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times dark:text-white text-slate-400 xl:hidden"
                        sidenav-close=""
                    />
                    <span
                        className="block px-8 py-6 m-0 text-sm whitespace-nowrap dark:text-white text-slate-700"
                    >
                        <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand text-xl">
                           Absensi
                        </span>
                    </span>
                </div>
                <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />
                <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
                    <ul className="flex flex-col pl-0 mb-0 gap-3 pt-4">
                        {MenuDashboard &&
                            MenuDashboard.map((menu, index) => (
                                <li className="mt-0.5 w-full">
                                    <Link
                                        className="py-2.7 bg-blue-500/13 dark:text-white dark:opacity-80 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors"
                                        href={menu.url}
                                    >
                                        <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                            <i
                                                className={`relative top-0 text-lg leading-normal ${
                                                    menu.url === relevantPath
                                                        ? "text-teal-500"
                                                        : "text-gray-500"
                                                } ni ni-tv-2 ${menu.icon}`}
                                            />
                                        </div>
                                        <span
                                            className={`ml-1 duration-300 opacity-100 pointer-events-none ease text-lg  ${
                                                menu.url ===
                                                window.location.pathname
                                                    ? "text-teal-500"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {menu.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            </aside>
            <main className="xl:ml-[18rem] relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
                <nav
                    className="bg-teal-600 relative flex flex-wrap items-center justify-between px-0 py-2 m-2 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start"
                    navbar-main=""
                    navbar-scroll="false"
                >
                    <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
                        <nav>
                            <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                                <li className="text-sm leading-normal">
                                    <span className="text-white opacity-50">
                                        Pages
                                    </span>
                                </li>
                                <li
                                    aria-current="page"
                                    className="text-sm pl-2 capitalize leading-normal text-white before:float-left before:pr-2 before:text-white before:content-['/']"
                                >
                                    {props.title && props.title}
                                </li>
                            </ol>
                            <h6 className="mb-0 font-bold text-white capitalize">
                                {props.title && props.title}
                            </h6>
                        </nav>
                        <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
                            <div className="flex items-center md:ml-auto md:pr-4">
                                <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease">
                                    <span className="text-sm ease leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                                        <i className="fas fa-search" />
                                    </span>
                                    <input
                                        className="pl-9 text-sm focus:shadow-primary-outline ease w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 dark:bg-slate-850 dark:text-white bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:transition-shadow"
                                        placeholder="Type here..."
                                        type="text"
                                    />
                                </div>
                            </div>
                            <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                                <li className="flex items-center">
                                    <Link
                                        className="block px-0 py-2 text-sm font-semibold text-white transition-all ease-nav-brand"
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        <i className="fa fa-user sm:mr-1" />
                                        <span className="hidden sm:inline">
                                            Logout
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {children}
            </main>
        </body>
    );
}
