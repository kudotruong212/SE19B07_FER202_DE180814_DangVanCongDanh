import React from "react";
import Container from "react-bootstrap/Container";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import MovieCard from "../components/Movies/MovieCard";
import { movies } from "../data/movies";

export default function HomePage() {
    return (
        <Container className="mt-3">
            <HomeCarousel />
            <div className="mt-4">
                <h4>Featured Movies Collections</h4>
                <p className="text-secondary">Các bộ phim nổi bật (grid responsive).</p>
                <MovieCard items={movies} />
            </div>
        </Container>
    );
}
