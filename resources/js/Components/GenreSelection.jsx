import useBreakpoints from "@/Hooks/useBreakpoints";
import { router } from "@inertiajs/react";
import React from "react";

const GenreSelection = ({ setGenreSelection, setDrawerIsOpen }) => {
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
        setGenreSelection(false);
        router.visit("/anime/genre/" + genre);
    };

    return (
        <div className="grid grid-cols-5 lg:gap-2 w-full">
            {genres.map((genre) => (
                <button
                    className="bg-slate-200 btn btn-sm w-full rounded-sm"
                    onClick={() => onSelectedGenre(genre)}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
};

export default GenreSelection;
