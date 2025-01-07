import AnimeAiringSchedule from "@/Partials/AnimeAiringSchedule";
import AnimeRecentEpisodes from "@/Partials/AnimeRecentEpisodes";
import FlexAnime from "@/Partials/FlexAnime";
import NewsFeeds from "@/Partials/NewsFeeds";
import { Head } from "@inertiajs/react";
import React from "react";

const Home = () => {
    return (
        <div>
            <Head title="Home" />

            <FlexAnime category={"trending"} />
            <FlexAnime category={"popular"} />
            <FlexAnime category={"airing-schedule"} />
            <div className="divider"></div>

            <div className="grid grid-cols-5">
                <div className="col-span-4">
                    <NewsFeeds />
                </div>
                <AnimeRecentEpisodes />
            </div>
        </div>
    );
};

export default Home;
