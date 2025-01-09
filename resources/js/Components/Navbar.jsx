import { GrSearch } from "react-icons/gr";
import React, { useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { router } from "@inertiajs/react";
import GenreSelection from "./GenreSelection";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [animeResults, setAnimeResults] = useState([]);
    const [mangaResults, setMangaResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [genreSelection, setGenreSelection] = useState(false);

    // Function to fetch anime based on search query
    const fetchAnimeQuery = async (query) => {
        try {
            const { data } = await axios.get(
                `https://anime-host-api.vercel.app/meta/anilist/${query}`
            );
            setAnimeResults(data.results || []);
        } catch (error) {
            console.error("Error fetching anime data:", error);
            setAnimeResults([]);
        }
    };

    const fetchMangaQuery = async (query) => {
        try {
            const { data } = await axios.get(
                `https://anime-host-api.vercel.app/manga/mangadex/${query}`
            );
            setMangaResults(data.results || []);
        } catch (error) {
            console.error("Error fetching manga data:", error);
            setMangaResults([]);
        }
    };

    const debouncedFetch = useCallback(
        debounce((query) => {
            setLoading(true);
            fetchAnimeQuery(query);
            fetchMangaQuery(query);
            setLoading(false);
        }, 500),
        []
    );

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setDropdownOpen(query.length > 0);
        debouncedFetch(query);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchAnimeQuery(searchQuery);
        fetchMangaQuery(searchQuery);
    };
    // Handle selection of an anime item
    const onSelectedItem = (id, type) => {
        setSearchQuery("");
        setAnimeResults([]);
        setMangaResults([]);
        setDropdownOpen(false);
        router.visit(`/${type}/${id}`);
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
                role="button"
                className="btn btn-sm m-1 bg-slate-400 border-0 text-gray-200 font-thin"
                onClick={() => onClickRandomAnime()}
            >
                Random Anime
            </div>

            {/* Genre*/}
            <div className="dropdown dropdown-hover dropdown-end">
                <div
                    role="button"
                    className="btn btn-sm m-1 bg-slate-400 border-0 text-gray-200 font-thin"
                    onMouseEnter={() => setGenreSelection(true)}
                    // onMouseLeave={() => setgenreSelection(false)}
                >
                    Genre
                </div>
                {genreSelection ? (
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-md z-[1] w-[50vw] p-2 shadow"
                    >
                        <GenreSelection setGenreSelection={setGenreSelection} />
                    </ul>
                ) : (
                    <></>
                )}
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
                            placeholder="Search anime/manga..."
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
                            dropdownOpen &&
                            !loading &&
                            (animeResults.length || mangaResults.length)
                                ? "dropdown-open"
                                : ""
                        }`}
                    >
                        {dropdownOpen &&
                        !loading &&
                        (animeResults.length || mangaResults.length) ? (
                            <div className="dropdown-content rounded-md z-[1] w-[50vw] mt-6 shadow-lg shadow-black/80 bg-slate-200">
                                <div className="grid grid-cols-2 gap-4 bg-slate-500 rounded-t-md py-2 text-gray-200 shadow-lg">
                                    <div className="text-center">Manga</div>
                                    <div className="text-center">Anime</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 overflow-y-auto h-[40vh] px-4 pt-10">
                                    <div>
                                        {mangaResults.length > 0 ? (
                                            mangaResults.map((manga) => (
                                                <div
                                                    key={manga.id}
                                                    onClick={() =>
                                                        onSelectedItem(
                                                            manga.id,
                                                            "manga"
                                                        )
                                                    }
                                                    className="flex h-20 items-center rounded-md bg-slate-300 shadow-md mb-4 hover:scale-y-105 transition-transform duration-200 ease-out hover:cursor-pointer"
                                                >
                                                    <img
                                                        src={manga.image}
                                                        alt={manga.title}
                                                        className="h-full w-16 object-cover bg-white mr-4 rounded-s-md"
                                                    />
                                                    <div>
                                                        <h2 className="font-bold text-xs">
                                                            {manga.title}
                                                        </h2>
                                                        <p className="text-xs font-extralight">
                                                            Chapters:{" "}
                                                            {manga.chapters}
                                                        </p>
                                                        <p className="text-xs font-extralight">
                                                            Status:{" "}
                                                            {manga.status}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No manga found</p>
                                        )}
                                    </div>
                                    <div>
                                        {animeResults.length > 0 ? (
                                            animeResults.map((anime) => (
                                                <div
                                                    key={anime.id}
                                                    onClick={() =>
                                                        onSelectedItem(
                                                            anime.id,
                                                            "anime"
                                                        )
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
                                                            Rating:{" "}
                                                            {anime.rating}%
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No anime found</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Navbar;
