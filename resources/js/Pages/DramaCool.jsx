import FlexDrama from "@/Partials/FlexDrama";
import { Head } from "@inertiajs/react";
import React from "react";

const DramaCool = () => {
    return (
        <div>
            <Head title="Drama Cool" />
            <h1 className="font-bold text-2xl">Drama Cool</h1>
            <FlexDrama category={"popular"} />
        </div>
    );
};

export default DramaCool;
