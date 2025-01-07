import Feeds from "@/Components/Feeds";
import React from "react";

const NewsFeeds = () => {
    return (
        <div>
            <h1 className="text-2xl">News Feeds</h1>
            <Feeds topic={""} />
        </div>
    );
};

export default NewsFeeds;
