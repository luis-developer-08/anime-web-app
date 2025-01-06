import { Link, router } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const Navbar = () => {
    const fetchAnimeGenres = async () => {
        const { data } = await axios.get(
            "https://anime-host-api.vercel.app/anime/gogoanime/genre/list"
        );

        return data;
    };

    const { data, isLoading } = useQuery({
        queryFn: fetchAnimeGenres,
        queryKey: ["fetchAnimeGenres"],
    });

    return (
        <div className="navbar bg-slate-600 items-center shadow-md sticky top-0 px-16 z-10">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-white" href="/">
                    Free Anime Online Watch
                </a>
            </div>
            {/* <div className="dropdown dropdown-end dropdown-hover">
                <div
                    tabIndex={0}
                    className="btn m-1 btn-ghost btn-sm text-white"
                >
                    Genre
                </div>
                <div
                    tabIndex={0}
                    className="grid grid-cols-5 gap-4 dropdown-content menu bg-base-100 rounded-md z-[1] w-[50vw] h-[30vh] pt-10 px-4 pb-4 shadow overflow-y-auto overflow-x-hidden"
                >
                    {isLoading ? (
                        <></>
                    ) : (
                        <>
                            {data.map((genre) => (
                                <div
                                    className="btn bg-slate-200/90 btn-sm p-1 w-full text-xs font-extralight"
                                    key={genre.id}
                                    onClick={() => {
                                        router.visit(
                                            "/anime/genre/" + genre.id
                                        );
                                    }}
                                >
                                    {genre.title}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div> */}
        </div>
    );
};

export default Navbar;
