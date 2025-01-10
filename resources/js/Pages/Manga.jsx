import MangaBigDetails from "@/Partials/MangaBigDetails";
import MangaChapters from "@/Partials/MangaChapters";
import MangaReader from "@/Partials/MangaReader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Manga = ({ mangaId }) => {
    const [chapterId, setChapterId] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const fetchedChapterId = urlParams.get("chapterId");
        if (fetchedChapterId) {
            setChapterId(fetchedChapterId);
        }
    }, []);

    const fetchMangaInfo = async () => {
        const { data } = await axios.get(
            import.meta.env.VITE_API_ANIME_1 + "/manga/mangadex/info/" + mangaId
        );

        return data;
    };

    const { data: manga, isLoading } = useQuery({
        queryFn: fetchMangaInfo,
        queryKey: ["fetchMangaInfo", mangaId],
    });

    return (
        <div>
            {isLoading ? (
                <></>
            ) : (
                <Head
                    title={anime.title.userPreferred || anime.title.english}
                />
            )}

            <div className="px-20">
                <div className="grid grid-cols-5 gap-5">
                    <div className="col-span-4">
                        {chapterId ? (
                            <MangaReader chapterId={chapterId} />
                        ) : (
                            <></>
                        )}
                        {isLoading ? (
                            <MangaBigDetails isLoading={isLoading} />
                        ) : (
                            <MangaBigDetails manga={manga} />
                        )}
                    </div>
                    <div className="col-span-1">
                        {isLoading ? (
                            <MangaChapters isLoading={isLoading} />
                        ) : (
                            <MangaChapters
                                manga={manga}
                                chapterId={chapterId}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manga;
