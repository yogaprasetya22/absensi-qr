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
            <div className="flex justify-center items-center">
                <a
                    href="https://dribbble.com/shots/15515537/attachments/7378723?mode=media"
                    className="text-black"
                >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hover:text-gray-900"
                    >
                        <rect width="30" height="30" fill="url(#pattern0)" />
                        <defs>
                            <pattern
                                id="pattern0"
                                patternContentUnits="objectBoundingBox"
                                width="1"
                                height="1"
                            >
                                <use
                                    xlinkHref="#image0_532:376"
                                    transform="scale(0.0333333)"
                                />
                            </pattern>
                            <img
                                id="image0_532:376"
                                width="30"
                                height="30"
                                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA.. (truncated for brevity)"
                            />
                        </defs>
                    </svg>
                </a>
            </div>
        </div>
    );
}
