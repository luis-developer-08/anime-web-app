import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import AnimeRecentEpisodes from "@/Partials/AnimeRecentEpisodes";
import NewsFeeds from "@/Partials/NewsFeeds";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // Disable refetching when the window regains focus
            // refetchOnReconnect: false, // Disable refetching when the network reconnects
            staleTime: 1000 * 60 * 5, // Data will stay fresh for 5 minutes
        },
    },
});

const Main = ({ children }) => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // Check initial connection status
        setIsOnline(navigator.onLine);

        // Define event handlers
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        // Attach event listeners
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Cleanup event listeners on unmount
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 py-5 px-20 bg-slate-200">
                    {isOnline ? (
                        <>
                            {children}
                            <div className="divider"></div>

                            <div className="grid grid-cols-5 gap-10">
                                <div className="col-span-4">
                                    <NewsFeeds />
                                </div>
                                <AnimeRecentEpisodes />
                            </div>
                        </>
                    ) : (
                        <div role="alert" className="alert alert-error">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold">
                                    No Internet Connection
                                </h2>
                                <p className="text-gray-600">
                                    Please check your network and try again.
                                </p>
                            </div>
                        </div>
                    )}
                </main>
                <Footer />
            </div>
        </QueryClientProvider>
    );
};

export default Main;
