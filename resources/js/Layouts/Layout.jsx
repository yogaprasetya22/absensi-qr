import Navbar from "@/Components/Navbar";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

export default function Layout({ children }) {
    const { props } = usePage();
    const user = props.auth.user;
    return (
        <>
            {props.title && <Head title={props.title} />}
            <div className="w-full ">
                <Navbar user={user} />
                <main className="p-5">{children}</main>
                <footer className="footer footer-center p-2 bg-teal-600/70 text-white">
                    <aside>
                        <p>
                            © {new Date().getFullYear()} BPSI Universitas Nasional. All rights reserved.
                        </p>
                    </aside>
                </footer>
            </div>
        </>
    );
}
