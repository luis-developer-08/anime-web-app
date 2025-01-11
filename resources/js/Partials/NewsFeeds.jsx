import Feeds from "@/Components/Feeds";
import React, { useState } from "react";

const NewsFeeds = () => {
    const [selectedTopic, setSelectedTopic] = useState("");

    const topics = [
        "anime",
        "animation",
        "manga",
        "games",
        "novels",
        "live-action",
        "covid-19",
        "industry",
        "music",
        "people",
        "merch",
        "events",
    ];

    return (
        <div>
            <h1 className="text-xs lg:text-2xl">News Feeds</h1>
            <Feeds />
        </div>
    );
};

export default NewsFeeds;
