import { router } from "@inertiajs/react";
import React from "react";

const GenreSelection = () => {
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
        router.visit("/anime/genre/" + genre);
    };

    return (
        <div className="grid grid-cols-5 gap-2">
            {genres.map((genre) => (
                <button
                    className="bg-slate-200 btn btn-sm"
                    onClick={() => onSelectedGenre(genre)}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
};

export default GenreSelection;
