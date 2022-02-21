import {useState, useEffect} from 'react';
import { getMovieDetails } from '../utils/apiCalls';

export default function useMovieDetails(movieId){
    
    const [loading, setLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState({});
    const [characters, setCharacters] = useState([]);
    const [sortingDirections, setSortingDirections] = useState({ 'name' : 'DESCENDING'});


    const fetchData = async (movieId) => {
        const filteredMovieDetails = await getMovieDetails(movieId);
        setMovieDetails(filteredMovieDetails);
        setCharacters(filteredMovieDetails.characters);
        setLoading(false);
    }

    useEffect(() => {
        fetchData(movieId);
    }, [])

    return {
        loading,
        movieDetails,
        characters,
        setCharacters,
        sortingDirections,
        setSortingDirections
    }
}