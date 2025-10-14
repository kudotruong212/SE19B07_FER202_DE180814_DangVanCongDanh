import React, { useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import MovieCard from "../components/Movies/MovieCard";
import Filter from "../components/Filter/Filter";
import { movies } from "../data/movies";

export default function HomePage() {
    const [filterState, setFilterState] = useState({
        search: "",
        yearRange: "all",
        sort: ""
    });

    const filteredMovies = useMemo(() => {
        let filtered = [...movies];

        // Search filter
        if (filterState.search) {
            const searchLower = filterState.search.toLowerCase();
            filtered = filtered.filter(movie => 
                movie.title.toLowerCase().includes(searchLower) ||
                movie.description.toLowerCase().includes(searchLower)
            );
        }

        // Year filter
        if (filterState.yearRange !== "all") {
            filtered = filtered.filter(movie => {
                switch (filterState.yearRange) {
                    case "<=2000":
                        return movie.year <= 2000;
                    case "2001-2015":
                        return movie.year >= 2001 && movie.year <= 2015;
                    case ">2015":
                        return movie.year > 2015;
                    default:
                        return true;
                }
            });
        }

        // Sort
        if (filterState.sort) {
            filtered.sort((a, b) => {
                switch (filterState.sort) {
                    case "year-asc":
                        return a.year - b.year;
                    case "year-desc":
                        return b.year - a.year;
                    case "title-asc":
                        return a.title.localeCompare(b.title);
                    case "title-desc":
                        return b.title.localeCompare(a.title);
                    case "duration-asc":
                        return a.duration - b.duration;
                    case "duration-desc":
                        return b.duration - a.duration;
                    default:
                        return 0;
                }
            });
        }

        return filtered;
    }, [filterState]);

    return (
        <Container className="mt-3">
            <HomeCarousel />
            <div className="mt-4">
                <h4 className="text-light">Featured Movies Collections</h4>
                <p className="text-light">Các bộ phim nổi bật (grid responsive).</p>
                <Filter onFilterChange={setFilterState} />
                <MovieCard items={filteredMovies} />
            </div>
        </Container>
    );
}
