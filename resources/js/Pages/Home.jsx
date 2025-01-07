import AnimeAiringSchedule from "@/Partials/AnimeAiringSchedule";
import AnimeHero from "@/Partials/AnimeHero";
import AnimeRecentEpisodes from "@/Partials/AnimeRecentEpisodes";
import FlexAnime from "@/Partials/FlexAnime";
import NewsFeeds from "@/Partials/NewsFeeds";
import { Head } from "@inertiajs/react";
import React from "react";

const Home = () => {
    return (
        <div>
            <Head title="Home" />
            <AnimeHero />
            <div className="px-20 mt-[100vh]">
                <FlexAnime category={"trending"} />
                <FlexAnime category={"popular"} />
                <FlexAnime category={"airing-schedule"} />
            </div>
        </div>
    );
};

export default Home;
