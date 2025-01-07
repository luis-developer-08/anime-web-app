import { useQuery } from "@tanstack/react-query";
import React from "react";

const AnimeAiringSchedule = () => {
    const fetchAnimeAiringSchedule = async () => {
        const { data } = await axios.get(
            "https://anime-host-api.vercel.app/meta/anilist/airing-schedule"
        );
        return data;
    };

    const { data } = useQuery({
        queryFn: fetchAnimeAiringSchedule,
        queryKey: ["fetchAnimeAiringSchedule"],
    });

    return <div>AnimeAiringSchedule</div>;
};

export default AnimeAiringSchedule;
