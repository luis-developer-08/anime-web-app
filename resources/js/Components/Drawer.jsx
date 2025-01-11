import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import React, { useState } from "react";
import { set } from "lodash";
import GenreSelection from "./GenreSelection";
import MobileGenreSelection from "./MobileGenreSelection";

const Drawer = ({ onClickRandomAnime, setGenreSelection }) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    return (
        <div className="drawer drawer-end ms-auto z-[2]">
            <input
                // id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
                checked={drawerIsOpen}
            />
            <div className="drawer-content">
                {/* Page content here */}
                <label
                    // htmlFor="my-drawer-4"
                    className="drawer-button btn btn-xs bg-slate-800 border-none btn-primary rounded-sm"
                    onClick={() => setDrawerIsOpen(true)}
                >
                    <AiOutlineMenu />
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-slate-300/90 text-base-content min-h-full w-[80vw] px-4 space-y-2">
                    {/* Sidebar content here */}
                    <div className="flex justify-end">
                        <button
                            className="btn btn-sm bg-slate-500 border-none text-gray-300 rounded-sm"
                            onClick={() => setDrawerIsOpen(false)}
                        >
                            <AiOutlineClose />
                        </button>
                    </div>
                    <li>
                        <button
                            className="btn btn-sm bg-slate-500 border-none text-gray-300 rounded-sm"
                            onClick={() => {
                                setDrawerIsOpen(false);
                                onClickRandomAnime();
                            }}
                        >
                            RANDOM ANIME
                        </button>
                    </li>
                    <li>
                        <MobileGenreSelection
                            setDrawerIsOpen={setDrawerIsOpen}
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Drawer;
