import ApplicationLogo from "@/Components/ui/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen">
            <link
                href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
                rel="stylesheet"
            />
            <div className="bg-teal-400 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-teal-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
            <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
                <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
                    <div className="self-start hidden lg:flex flex-col text-gray-300">
                        <h1 className="my-3 font-semibold text-4xl">
                            Selamat Datang
                        </h1>
                        <p className="pr-3 text-sm opacity-75">
                            aplikasi ini adalah aplikasi yang dibuat untuk
                            memudahkan dalam mengelola data absensi mahasiswa
                        </p>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
