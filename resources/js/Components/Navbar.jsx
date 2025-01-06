import { Link } from "@inertiajs/react";
import React from "react";

const Navbar = () => {
    return (
        <div className="navbar bg-slate-600 items-center shadow-md sticky top-0 px-16 z-10">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-white">
                    Free Anime Online Watch
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 space-x-2 text-white">
                    <li className="active:text:gray">
                        <Link href="/">Home</Link>
                    </li>
                    {/* <li>
                        <Link href="/drama-cool">Drama Cool</Link>
                    </li>
                    <li>
                        <Link href="/flix-hq">Flix HQ</Link>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
