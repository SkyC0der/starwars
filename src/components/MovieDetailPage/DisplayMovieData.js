import { Row, Col } from 'react-bootstrap';
import Characters from './../MovieDetailPage/MovieCharacters'
import SpeciesCount from './../MovieDetailPage/SpeciesCount'


export default function DisplayMovieData({
    title,
    episodeId,
    speciesCount,
    director,
    releaseDate,
    characters,
    setCharacters,
    sortingDirections,
    setSortingDirections
}) {
    return (
        <div>
            <h1>{title}</h1>
            <p>Episode #{episodeId}</p>
            <h6>The movie was directed by {director} and released on {releaseDate}</h6>

            <Row>
                <Col lg={8}>
                    <Characters
                        characters={characters}
                        setCharacters={setCharacters}
                        sortingDirections={sortingDirections}
                        setSortingDirections={setSortingDirections}
                    />
                </Col>

                <Col>
                    <SpeciesCount 
                        speciesCount={speciesCount}
                    />
                </Col>
            </Row>


        </div>
    )
}