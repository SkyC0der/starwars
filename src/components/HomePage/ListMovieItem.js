import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ListMovieItem({
    title,
    episodeId,
    director,
    releaseDate,
    id
}) {
    return (
        <Card className='movieCard'>
            <Card.Body>
                <Card.Title> 
                <Link to={`/films/${id}`}>
                    {title} 
                </Link>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Episode #{episodeId} </Card.Subtitle>
                <Card.Text>
                    The movie was directed by <b>{director}</b> and released on <b>{releaseDate}</b> 
                </Card.Text>
            </Card.Body>
        </Card>
    )
}