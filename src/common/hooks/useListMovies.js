import { useState, useEffect } from "react";
import { getMovies } from '../utils/apiCalls';

export default function useListMovies (){
    const [loading, setLoading] = useState(true);
    const [moviesList, setMoviesList] = useState([])

    const fetchData = async () => {
        const movies = await getMovies();
        setMoviesList(movies);
        setLoading(false);
    }

    useEffect ( () => {
        fetchData();
    }, []);

    return {
        loading, 
        moviesList
    }
}