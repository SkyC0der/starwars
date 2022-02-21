import { Table } from 'react-bootstrap';

export default function ({
    characters,
    setCharacters,
    sortingDirections,
    setSortingDirections
}) {


    const oneCharacter = characters?.[0];

    const sortData = (
        data,
        sortKey,
        sortingDirection
    ) => {
        const reA = /[^a-zA-Z]/g;
        const reN = /[^0-9]/g;
        data.sort((a, b) => {
            const relevantValueA = a[sortKey] === 'Unknown' ? '0' : a[sortKey];
            const relevantValueB = b[sortKey] === 'Unknown' ? '0' : b[sortKey];
            const aA = relevantValueA.replace(reA, "");
            const bA = relevantValueB.replace(reA, "");

            if (
                sortingDirection === undefined ||
                sortingDirection === 'ASCENDING'
            ) {
                if (aA === bA) {
                    const aN = parseInt(relevantValueA.replace(reN, ""), 10);
                    const bN = parseInt(relevantValueB.replace(reN, ""), 10);
                    return aN === bN ? 0 : aN > bN ? 1 : -1;
                } else {
                    return aA > bA ? 1 : -1;
                }

            } else {
                if (aA === bA) {
                    const aN = parseInt(relevantValueA.replace(reN, ""), 10);
                    const bN = parseInt(relevantValueB.replace(reN, ""), 10);
                    return aN === bN ? 0 : aN > bN ? -1 : 1;
                } else {
                    return aA > bA ? -1 : 1;
                }
            }
        });
    };

    const sortColumn = (sortKey) => {
        console.log(sortKey)
        const newCharacters = [
            ...characters,
        ];

        const currentSortingDirection = sortingDirections[sortKey];
        console.log('currentSortingDirection ', currentSortingDirection)

        sortData(newCharacters, sortKey, currentSortingDirection);
        const nextSortingDirection = getNextSortingDirection(
            currentSortingDirection
        );

        const newSortingDirections = { ...sortingDirections };
        newSortingDirections[sortKey] = nextSortingDirection;
        characters = newCharacters;

        setCharacters(newCharacters);
        setSortingDirections(newSortingDirections);
    };

    const getNextSortingDirection = (sortingDirection) => {

        if (
            sortingDirection === undefined ||
            sortingDirection === 'ASCENDING'
        ) {
            return 'DESCENDING';
        }
        return 'ASCENDING';
    };


    return (
        <div className='characterTable'>
            <p>Movie Characters</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {
                            Object.keys(oneCharacter).map((character, i) => {
                                return (
                                    <th key={i} onClick={() => {
                                        sortColumn(character);
                                    }}>
                                        {character}
                                        <span className="sort-by"></span>
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        characters.map((character, j) => {
                            return (
                                <tr key={j}>
                                    {
                                        Object.keys(character).map((quality, k) => {
                                            return (
                                                <td key={k}>
                                                    {character[quality]}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}