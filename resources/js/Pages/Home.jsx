import Main from "@/Layouts/Main";
import FlexAnime from "@/Partials/FlexAnime";
import SplideAnime from "@/Partials/SplideAnime";
import { Head } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const Home = () => {
    return (
        <div>
            <Head title="Home" />
            <FlexAnime category={"trending"} />
            <FlexAnime category={"popular"} />
        </div>
    );
};

export default Home;
