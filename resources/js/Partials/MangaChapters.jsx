import { router } from "@inertiajs/react";
import React, { useState, useEffect, useMemo } from "react";

const MangaChapters = ({ manga = {}, isLoading, chapterId }) => {
    const chapters = manga.chapters || [];

    // UseMemo to reverse chapters
    const reversedChapters = useMemo(() => [...chapters].reverse(), [chapters]);

    const chunkArray = (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    };

    // Grouped chapters based on reversed chapters
    const groupedChapters = useMemo(
        () => (isLoading ? [] : chunkArray(reversedChapters, 100)),
        [isLoading, reversedChapters]
    );

    const currentChapterIndex = reversedChapters.findIndex(
        (chapter) => chapter.id === chapterId
    );

    const currentGroupIndex = Math.floor(currentChapterIndex / 100);

    const [expandedGroup, setExpandedGroup] = useState(
        currentGroupIndex >= 0 ? currentGroupIndex : null
    );

    const [manualToggle, setManualToggle] = useState(false);

    const onSelectedMangaChapter = (newChapterId) => {
        router.visit(`/manga/${manga.id}?chapterId=${newChapterId}`);
    };

    const handlePrev = () => {
        if (currentChapterIndex > 0) {
            const prevChapterId = reversedChapters[currentChapterIndex - 1].id;
            onSelectedMangaChapter(prevChapterId);
        }
    };

    const handleNext = () => {
        if (
            currentChapterIndex >= 0 &&
            currentChapterIndex < reversedChapters.length - 1
        ) {
            const nextChapterId = reversedChapters[currentChapterIndex + 1].id;
            onSelectedMangaChapter(nextChapterId);
        }
    };

    const toggleGroup = (groupIndex) => {
        setExpandedGroup((prevGroup) =>
            prevGroup === groupIndex ? null : groupIndex
        );
        setManualToggle(true); // Mark manual toggling
    };

    useEffect(() => {
        // Auto-open group when chapterId changes, unless manually toggled
        if (!manualToggle) {
            if (chapterId === null) {
                // Open the first group (1-100) if chapterId is null
                setExpandedGroup(0);
            } else if (currentGroupIndex >= 0) {
                setExpandedGroup(currentGroupIndex);
            }
        }
    }, [chapterId, currentGroupIndex, manualToggle]);

    useEffect(() => {
        // Reset manual toggle when chapterId changes
        setManualToggle(false);
    }, [chapterId]);

    return (
        <div className="mb-5">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold">Chapters</h1>
                <div className="join">
                    <button
                        onClick={handlePrev}
                        className="join-item btn btn-xs bg-slate-300 border-0"
                        disabled={currentChapterIndex <= 0}
                    >
                        Prev
                    </button>
                    <input
                        type="text"
                        className="input-xs join-item input w-12"
                        value={currentChapterIndex + 1} // Show as 1-based index
                        disabled
                    />
                    <button
                        onClick={handleNext}
                        className="join-item btn btn-xs bg-slate-300 border-0"
                        disabled={
                            currentChapterIndex === -1 ||
                            currentChapterIndex >= reversedChapters.length - 1
                        }
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className="mt-4 h-[40vh] overflow-y-auto">
                {isLoading ? (
                    <div className="flex flex-wrap justify-center gap-2">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div
                                key={index}
                                className="w-16 h-8 rounded-md skeleton bg-slate-300"
                            ></div>
                        ))}
                    </div>
                ) : reversedChapters.length > 0 ? (
                    groupedChapters.map((group, groupIndex) => (
                        <div
                            key={groupIndex}
                            className="mb-1 border rounded-md shadow-sm"
                        >
                            <div
                                className="flex justify-between items-center px-4 py-2 cursor-pointer"
                                onClick={() => toggleGroup(groupIndex)}
                            >
                                <h2 className="text-sm">
                                    Chapters {groupIndex * 100 + 1} -{" "}
                                    {(groupIndex + 1) * 100}
                                </h2>
                            </div>
                            {expandedGroup === groupIndex && (
                                <div className="grid grid-cols-5 p-1">
                                    {group.map((chapter, index) => (
                                        <button
                                            onClick={() =>
                                                onSelectedMangaChapter(
                                                    chapter.id
                                                )
                                            }
                                            key={chapter.id}
                                            disabled={chapter.id === chapterId}
                                            className={`btn btn-sm rounded-md w-full text-xs ${
                                                chapter.id === chapterId
                                                    ? "bg-gray-500 text-white cursor-not-allowed"
                                                    : "bg-slate-400"
                                            }`}
                                        >
                                            {/* {`${chapter.chapterNumber} `} */}
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        No chapters available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default MangaChapters;
