import { ListGroup, Badge } from 'react-bootstrap';


export default function SpeciesCount({
    speciesCount
}){
    return(
        <div className='speciesEntries'>
        <p>Movie Species</p>
        <ListGroup as="ol" numbered>
        {
            Object.keys(speciesCount).map((species, i) => {
                return (
                    <ListGroup.Item
                        key={i}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{species}</div>
                        </div>
                        <Badge bg="primary" pill>
                            {speciesCount[species]}
                        </Badge>
                    </ListGroup.Item>
                )
            })
        }
    </ListGroup>
        </div>

    )
}