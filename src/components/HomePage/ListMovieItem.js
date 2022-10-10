import { Card } from 'react-bootstrap';

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
                <span>
                    {title} 
                </span>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Episode #{episodeId} </Card.Subtitle>
                <Card.Text>
                    The movie was directed by <b>{director}</b> and released on <b>{releaseDate}</b> 
                </Card.Text>
            </Card.Body>
        </Card>
    )
}