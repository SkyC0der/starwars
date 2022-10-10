import { Row, Col } from 'react-bootstrap';
import Characters from './../MovieDetailPage/MovieCharacters'


export default function DisplayMovieData({
    title,
    episodeId,
    openingCrawl,
    director,
    totalHeight,
    releaseDate,
    characters,
    setCharacters,
    sortingDirections,
    setSortingDirections
}) {
    // console.log(characters)
    return (
        <div>
            <h2>The Story</h2>
            <div className="menu">
                <div className="menu__item">
                    <div className="marquee">
                        <div className="marquee__inner">
                            <span className='help'>{openingCrawl}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Row>
                <Col lg={8}>
                    <Characters
                        characters={characters}
                        totalHeight={totalHeight}
                        setCharacters={setCharacters}
                        sortingDirections={sortingDirections}
                        setSortingDirections={setSortingDirections}
                    />
                </Col>
            </Row>


        </div>
    )
}