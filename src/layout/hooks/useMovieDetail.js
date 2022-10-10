import {useState, useEffect} from 'react';
import { getMovieDetails } from '../utils/apiCalls';

export default function useMovieDetails(movieId){
    
    const [loading2, setLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState({});
    const [characters, setCharacters] = useState([]);
    const [sortingDirections, setSortingDirections] = useState({ 'name' : 'DESCENDING'});


    const fetchData = async (movieId) => {
        setLoading(true)
        const filteredMovieDetails = await getMovieDetails(movieId);
        setMovieDetails(filteredMovieDetails);
        setCharacters(filteredMovieDetails.characters);
        setLoading(false);
    }

    useEffect(() => {
        fetchData(movieId);
    }, [movieId])

    return {
        loading2,
        movieDetails,
        characters,
        setCharacters,
        sortingDirections,
        setSortingDirections
    }
}