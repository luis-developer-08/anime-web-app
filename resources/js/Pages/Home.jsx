import useBreakpoints from "@/Hooks/useBreakpoints";
import AnimeAiringSchedule from "@/Partials/AnimeAiringSchedule";
import AnimeHero from "@/Partials/AnimeHero";
import AnimeRecentEpisodes from "@/Partials/AnimeRecentEpisodes";
import FlexAnime from "@/Partials/FlexAnime";
import NewsFeeds from "@/Partials/NewsFeeds";
import { Head } from "@inertiajs/react";
import React from "react";

const Home = () => {
    const { isMobile, isTablet, isDesktop } = useBreakpoints();
    return (
        <div>
            <Head title="Home" />
            {isDesktop ? <AnimeHero /> : <></>}
            <div className={`${isDesktop ? "px-20 mt-[100vh]" : "px-5"}`}>
                <FlexAnime category={"trending"} />
                <FlexAnime category={"popular"} />
                <FlexAnime category={"airing-schedule"} />
            </div>
        </div>
    );
};

export default Home;
