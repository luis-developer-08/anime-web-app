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
            {/* <div className="flex justify-between items-center"> */}
            <h1 className="text-2xl">News Feeds</h1>

            {/* <select
                    className="select select-sm text-xs"
                    onChange={(e) => setSelectedTopic(e.target.value)}
                >
                    <option value="">--Select Topic--</option>
                    {topics.map((topic) => (
                        <option value={topic}>{topic}</option>
                    ))}
                </select> */}
            {/* </div> */}
            <Feeds topic={selectedTopic} />
        </div>
    );
};

export default NewsFeeds;
