import React from 'react';
import useMovieDetail from '../../common/hooks/useMovieDetail';
import { useParams } from "react-router-dom";
import Loader from '../../common/components/Loader';
import DisplayMovieData from './../MovieDetailPage/DisplayMovieData'
import { Container } from 'react-bootstrap';


export default function MovieDetail() {
    const { id } = useParams();
    const { loading, movieDetails, characters, setCharacters, sortingDirections, setSortingDirections } = useMovieDetail(id);

    return (
        <Container>
            {loading ? (
                <Loader />
            ) : (
                <DisplayMovieData
                    title={movieDetails.title}
                    director={movieDetails.director}
                    speciesCount={movieDetails.speciesCount}
                    episodeId={movieDetails.episodeId}
                    releaseDate={movieDetails.releaseDate}
                    characters={characters}
                    setCharacters={setCharacters}
                    sortingDirections={sortingDirections}
                    setSortingDirections={setSortingDirections}
                />
            )}
        </Container>
    )
}