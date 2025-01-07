import { GrSearch } from "react-icons/gr";
import React, { useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { router } from "@inertiajs/react";
import GenreSelection from "./GenreSelection";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]); // Ensure results is an array
    const [loading, setLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // Controls the dropdown visibility

    // Function to fetch anime based on search query
    const fetchAnimeQuery = async (query) => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                "https://anime-host-api.vercel.app/meta/anilist/" + query
            );
            setResults(data.results || []); // Ensure data.results is an array
        } catch (error) {
            console.error("Error fetching data:", error);
            setResults([]); // Set an empty array if there's an error
        }
        setLoading(false);
    };

    // Debounced version of the fetchAnimeQuery function
    const debouncedFetch = useCallback(
        debounce((query) => {
            fetchAnimeQuery(query);
        }, 500), // Debounce delay (500ms)
        []
    );

    // Handler for search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setDropdownOpen(query.length > 0); // Open dropdown when there's a search query
        debouncedFetch(query); // Call debounced function
    };

    // Handle form submission (optional if you want to prevent page reload)
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchAnimeQuery(searchQuery);
    };

    // Handle selection of an anime item
    const onSelectedAnime = (animeId) => {
        setSearchQuery(""); // Clear the search query
        setResults([]); // Clear the results
        setDropdownOpen(false); // Close the dropdown
        router.visit("/anime/" + animeId); // Navigate to the anime page
    };

    const onClickRandomAnime = async () => {
        const { data } = await axios.get(
            "https://anime-host-api.vercel.app/meta/anilist/random-anime"
        );

        router.visit("/anime/" + data.id);
        // return data;
    };

    return (
        <div className="navbar bg-slate-600/90 items-center shadow-md sticky top-0 px-16 z-50">
            <div className="flex-1">
                <button
                    className="btn btn-ghost text-xl text-white"
                    onClick={() => router.visit("/")}
                >
                    Free Anime Online Watch
                </button>
            </div>

            {/* Random Anime*/}
            <div
                tabIndex={0}
                role="button"
                className="btn btn-sm m-1 bg-slate-400 border-0 text-gray-200 font-thin"
                onClick={() => onClickRandomAnime()}
            >
                Random Anime
            </div>

            {/* Genre*/}
            <div className="dropdown dropdown-hover dropdown-end">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-sm m-1 bg-slate-400 border-0 text-gray-200 font-thin"
                >
                    Genre
                </div>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-md z-[1] w-[50vw] p-2 shadow"
                >
                    <GenreSelection />
                </ul>
            </div>
            <div>
                {/* Search bar */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="flex items-center relative"
                >
                    <div className="join">
                        <input
                            type="text"
                            className="input input-bordered text-black join-item input-sm"
                            placeholder="Search anime..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button
                            type="submit"
                            className="btn bg-slate-400 ml-2 join-item btn-sm border-none"
                        >
                            <GrSearch className="text-gray-200" />
                        </button>
                    </div>

                    {/* Dropdown for search results */}
                    <div
                        className={`dropdown dropdown-end ${
                            dropdownOpen && results.length > 0 && !loading
                                ? "dropdown-open"
                                : ""
                        }`}
                    >
                        {dropdownOpen && results.length > 0 && !loading ? (
                            <ul
                                tabIndex={0}
                                className="dropdown-content rounded-md z-[1] w-[30vw] px-4 max-h-60 mt-6 pt-10 space-y-3 overflow-y-auto shadow-lg shadow-black/80 bg-slate-200"
                            >
                                {loading ? (
                                    <li className="p-2">Loading...</li>
                                ) : searchQuery && results.length > 0 ? (
                                    results.map((anime) => (
                                        <li key={anime.id}>
                                            <div
                                                onClick={() =>
                                                    onSelectedAnime(anime.id)
                                                }
                                                className="flex h-20 items-center rounded-md bg-slate-300 shadow-md mb-4 hover:scale-y-105 transition-transform duration-200 ease-out hover:cursor-pointer"
                                            >
                                                <img
                                                    src={anime.image}
                                                    alt={
                                                        anime.title
                                                            .userPreferred
                                                    }
                                                    className="h-full w-16 object-cover bg-white mr-4 rounded-s-md"
                                                />
                                                <div>
                                                    <h2 className="font-bold text-xs">
                                                        {
                                                            anime.title
                                                                .userPreferred
                                                        }
                                                    </h2>
                                                    <p className="text-xs font-extralight text-gray-500">
                                                        {anime.status}
                                                    </p>
                                                    <p className="text-xs font-extralight">
                                                        Episodes:{" "}
                                                        {anime.episodes}
                                                    </p>
                                                    <p className="text-xs font-extralight">
                                                        Rating: {anime.rating}%
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li className="p-2 mb-10 text-center">
                                        No results found
                                    </li>
                                )}
                            </ul>
                        ) : (
                            <></>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Navbar;
