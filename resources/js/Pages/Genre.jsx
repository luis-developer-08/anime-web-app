import FlexAnimeGenre from "@/Partials/FlexAnimeGenre";
import { Head } from "@inertiajs/react";
import React from "react";

const Genre = ({ genreId }) => {
    return (
        <div>
            <Head title={genreId} />
            <FlexAnimeGenre genre={genreId} />
        </div>
    );
};

export default Genre;
