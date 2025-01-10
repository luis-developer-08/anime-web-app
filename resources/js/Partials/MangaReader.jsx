import { useQuery } from "@tanstack/react-query";
import React from "react";

const MangaReader = ({ chapterId }) => {
    const fetchMangaImagesRead = async () => {
        const { data } = await axios.get(
            import.meta.env.VITE_API_ANIME_2 +
                "/manga/mangadex/read/" +
                chapterId
        );

        return data;
    };

    const { data, isLoading } = useQuery({
        queryFn: fetchMangaImagesRead,
        queryKey: ["fetchMangaImagesRead", chapterId],
    });

    console.log(data);

    return (
        <div>
            {isLoading ? (
                <div className="bg-slate-500 h-[85vh] w-full mb-10 flex flex-col items-center justify-center">
                    <span className="loading loading-spinner loading-lg text-white"></span>
                </div>
            ) : (
                <div className="flex flex-col h-[85vh] overflow-y-auto mb-10">
                    {data.map((image) => (
                        <img src={image.img} alt="" loading="lazy" />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MangaReader;
