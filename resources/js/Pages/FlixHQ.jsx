import FlexFlixHQ from "@/Partials/FlexFlixHQ";
import { Head } from "@inertiajs/react";
import React from "react";

const FlixHQ = () => {
    return (
        <div>
            <Head title="Flix HQ" />
            <h1 className="font-bold text-2xl">Flix HQ</h1>
            <FlexFlixHQ category={"recent-movies"} />
        </div>
    );
};

export default FlixHQ;
