import FlexAnime from "@/Partials/FlexAnime";
import { Head } from "@inertiajs/react";
import React from "react";

const Home = () => {
    return (
        <div>
            <Head title="Home" />
            {/* <h1 className="font-bold text-2xl">Anime</h1> */}
            <FlexAnime category={"trending"} />
            <FlexAnime category={"popular"} />
        </div>
    );
};

export default Home;
