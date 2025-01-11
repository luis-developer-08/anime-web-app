import { router } from "@inertiajs/react";
import React from "react";

const MobileGenreSelection = ({ setDrawerIsOpen }) => {
    const genres = [
        "Action",
        "Adventure",
        "Cars",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Mahou Shoujo",
        "Mecha",
        "Music",
        "Mystery",
        "Psychological",
        "Romance",
        "Sci-Fi",
        "Slice of Life",
        "Sports",
        "Supernatural",
        "Thriller",
    ];

    const onSelectedGenre = (genre) => {
        setDrawerIsOpen(false);
        router.visit("/anime/genre/" + genre);
    };
    return (
        <div className="w-full flex flex-col mt-2">
            <h1 className="text-sm font-bold">Genres</h1>
            <div className="divider mt-0"></div>
            <div className="grid grid-cols-2 w-full gap-1">
                {genres.map((genre) => (
                    <button
                        className="btn btn-xs text-xs font-extralight bg-slate-500 border-none text-gray-300 rounded-sm"
                        onClick={() => onSelectedGenre(genre)}
                    >
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MobileGenreSelection;
