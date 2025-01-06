import React from "react";

const DramaDetails = ({ drama, index, data, hoveredDrama }) => {
    return (
        <div
            id={`drama-detail-${drama.id}`}
            className="absolute z-10 bg-slate-800/90 text-white shadow-lg rounded-lg p-4 w-[30vw] opacity-0 transition-opacity duration-500 ease-in-out"
            style={{
                left: index >= data.results.length - 3 ? "auto" : "100%", // Show card on left for the last 3 items
                right: index >= data.results.length - 3 ? "100%" : "auto", // Show card on left for the last 3 items
                opacity: hoveredDrama?.id === drama.id ? 1 : 0, // Fade in/out effect
            }}
        >
            <h3 className="font-bold text-lg mb-2">{drama.title}</h3>
        </div>
    );
};

export default DramaDetails;
