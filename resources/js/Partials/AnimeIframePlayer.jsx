import useBreakpoints from "@/Hooks/useBreakpoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import Iframe from "react-iframe";

const AnimeIframePlayer = ({
    anime,
    episodeId,
    isLoadingAnimeIframePlayer,
}) => {
    const { isMobile, isTablet, isDesktop } = useBreakpoints();

    const iframeRef = useRef(null); // Create a ref to the iframe

    const fetchAnimeStreamLinks = async () => {
        const { data } = await axios.get(
            import.meta.env.VITE_API_ANIME_2 +
                `/anime/gogoanime/watch/${episodeId}`
        );
        return data;
    };

    const { data, isLoading } = useQuery({
        queryFn: fetchAnimeStreamLinks,
        queryKey: ["fetchAnimeStreamLinks", episodeId],
        enabled: !!episodeId,
    });

    useEffect(() => {
        // If the iframe exists, add the click event listener to prevent redirection
        const iframe = iframeRef.current;

        if (iframe) {
            const handleIframeClick = (event) => {
                event.preventDefault(); // Prevent default behavior (such as opening a new tab)
                alert("Iframe clicked! Preventing redirection.");
                // Optional: You can perform custom logic here, like opening in the same window
                // window.location.href = iframe.src;
            };

            iframe.addEventListener("click", handleIframeClick);

            // Cleanup: Remove the event listener when the component unmounts
            return () => {
                iframe.removeEventListener("click", handleIframeClick);
            };
        }
    }, []);

    return (
        <div style={{ width: "100%" }}>
            {isLoadingAnimeIframePlayer ? (
                <div
                    style={{
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: isMobile
                            ? "200px"
                            : isTablet
                            ? "400px"
                            : "600px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 10,
                    }}
                >
                    <span className="loading loading-spinner loading-lg text-white m-0"></span>
                </div>
            ) : (
                <>
                    {episodeId ? (
                        <>
                            {isLoading ? (
                                <div
                                    style={{
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: isMobile
                                            ? "200px"
                                            : isTablet
                                            ? "400px"
                                            : "600px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        zIndex: 10,
                                    }}
                                >
                                    <span className="loading loading-spinner loading-lg text-white m-0"></span>
                                </div>
                            ) : (
                                <Iframe
                                    ref={iframeRef} // Attach the ref to the iframe
                                    url={data.headers.Referer}
                                    width="100%"
                                    height={
                                        isMobile
                                            ? "200px"
                                            : isTablet
                                            ? "400px"
                                            : "600px"
                                    }
                                    // allowFullScreen
                                    // allow="autoplay"
                                    position="relative"
                                />
                            )}
                        </>
                    ) : (
                        <>
                            {anime.trailer && anime.trailer.id ? (
                                <Iframe
                                    url={`https://www.youtube.com/embed/${anime.trailer.id}?autoplay=1`}
                                    width="100%"
                                    height={
                                        isMobile
                                            ? "200px"
                                            : isTablet
                                            ? "400px"
                                            : "600px"
                                    }
                                    allowFullScreen
                                    allow="autoplay"
                                    title={`${
                                        anime.title.english ||
                                        anime.title.userPreferred
                                    } Trailer`}
                                />
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default AnimeIframePlayer;
