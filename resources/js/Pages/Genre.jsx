import AnimeRecentEpisodes from "@/Partials/AnimeRecentEpisodes";
import FlexAnimeGenre from "@/Partials/FlexAnimeGenre";
import NewsFeeds from "@/Partials/NewsFeeds";
import { Head } from "@inertiajs/react";
import React from "react";

const Genre = ({ genreId }) => {
    return (
        <div>
            <Head title={genreId} />
            <div className="px-5 lg:px-20">
                <FlexAnimeGenre genre={genreId} />
            </div>
        </div>
    );
};

export default Genre;
