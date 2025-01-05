import { Link } from "@inertiajs/react";
import React from "react";

const Navbar = () => {
    return (
        <div className="navbar bg-slate-600 items-center shadow-md sticky top-0 px-16 z-10">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-white">
                    Free Anime Online Stream
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    {/* <li>
                        <details>
                            <summary>Menu</summary>
                            <ul className="bg-base-100 rounded-t-none p-1 space-y-1">
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/about">About</Link>
                                </li>
                            </ul>
                        </details>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
