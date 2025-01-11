import useBreakpoints from "@/Hooks/useBreakpoints";
import React from "react";

const AnimeCharacters = ({ anime, isLoading }) => {
    const { isDesktop } = useBreakpoints();

    const skeletonLoader = Array.from({ length: 8 }); // Array for skeleton placeholders

    return (
        <div>
            <h1 className="font-bold text-xs lg:text-lg mb-6">Characters</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 -z-10">
                {isLoading
                    ? skeletonLoader.map((_, index) => (
                          <div
                              key={index}
                              className="border rounded-md shadow-lg p-4 flex flex-col items-center bg-white animate-pulse "
                          >
                              {/* Skeleton Image */}
                              <div className="w-20 sm:w-32 lg:w-40 h-20 sm:h-32 lg:h-40 rounded-full bg-gray-300 mb-4"></div>

                              {/* Skeleton Name */}
                              <div className="w-20 sm:w-32 h-4 bg-gray-300 rounded mb-2"></div>

                              {/* Skeleton Role */}
                              <div className="w-20 sm:w-24 h-4 bg-gray-300 rounded mb-4"></div>

                              {/* Skeleton Voice Actors */}
                              {isDesktop && (
                                  <div className="w-full">
                                      <div className="w-20 sm:w-24 h-4 bg-gray-300 rounded mb-2"></div>
                                      <ul className="space-y-2">
                                          {Array.from({ length: 3 }).map(
                                              (_, i) => (
                                                  <li
                                                      key={i}
                                                      className="flex items-center space-x-2"
                                                  >
                                                      <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                                                      <div className="w-20 sm:w-28 h-4 bg-gray-300 rounded"></div>
                                                  </li>
                                              )
                                          )}
                                      </ul>
                                  </div>
                              )}
                          </div>
                      ))
                    : anime.characters.map((character) => (
                          <div
                              key={character.id}
                              className="border rounded-sm lg:shadow-lg p-2 sm:p-3 lg:p-4 flex flex-col items-center bg-white"
                          >
                              {/* Character Image */}
                              <img
                                  src={character.image}
                                  alt={character.name.full}
                                  className="w-20 sm:w-32 lg:w-40 h-20 sm:h-32 lg:h-40 rounded-full object-cover mb-4"
                              />

                              {/* Character Name and Role */}
                              <h2 className="text-xs sm:text-sm lg:text-md font-bold text-center mb-1">
                                  {character.name.full}
                              </h2>
                              <p className="text-xs sm:text-sm lg:text-sm text-gray-500 mb-4">
                                  {character.role}
                              </p>

                              {/* Voice Actors */}
                              {isDesktop && (
                                  <div className="w-full">
                                      <h3 className="text-sm font-semibold mb-2">
                                          Voice Actors:
                                      </h3>
                                      <ul className="text-sm text-gray-700 space-y-2 h-40 overflow-y-auto">
                                          {character.voiceActors.map(
                                              (actor) => (
                                                  <li
                                                      key={actor.id}
                                                      className="flex items-center space-x-2"
                                                  >
                                                      <img
                                                          src={actor.image}
                                                          alt={actor.name.full}
                                                          className="w-8 h-8 rounded-full object-cover"
                                                      />
                                                      <span>
                                                          {actor.name.full} (
                                                          {actor.language})
                                                      </span>
                                                  </li>
                                              )
                                          )}
                                      </ul>
                                  </div>
                              )}
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default AnimeCharacters;
