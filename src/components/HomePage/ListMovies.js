import useListMovies from "../../common/hooks/useListMovies";
import ListMovieItem from "./../HomePage/ListMovieItem";
import Loader from '../../common/components/Loader'
import { Row, Container } from 'react-bootstrap';


export default function ListMovies() {
    const {loading, moviesList} = useListMovies();
    return (
        <Container>
        <Row>
          {loading ? (
            <Loader />
          ) : (
            moviesList.map((movie) => (
              <ListMovieItem
                key={movie.episode_id}
                releaseDate={movie.releaseDate}
                title={movie.title}
                director={movie.director}
                episodeId={movie.episode_id}
                id={movie.id}
              />
            ))
          )}
        </Row>
      </Container>
    )
}