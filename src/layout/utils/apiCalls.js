import axios from 'axios'
const MOVIES_LIST_URL = 'https://private-cors-server.up.railway.app/https://swapi.dev/api/films/';
const MINUTES_TO_CACHE = 5;

const writeToCache = (url, data) => localStorage.setItem(url, JSON.stringify(data));
const readFromCache = (url) => JSON.parse(localStorage.getItem(url)) || null;

const compareTime = (cached_time, now = new Date().getTime()) => {
    const difference = ((now - cached_time) / 60000);
    return difference < MINUTES_TO_CACHE ? true : false;
}

export const getMovies = async () => {
    const cachedData = readFromCache(MOVIES_LIST_URL);
    if (cachedData?.timestamp && compareTime(cachedData?.timestamp)) {
        const data = cachedData.data;
        return data;
    } else {
        const moviesResponse = await axios(MOVIES_LIST_URL);
        const moviesJson = await moviesResponse.data;
        const filteredMoviesList = moviesJson.results.map(movie => ({
            title: movie.title,
            releaseDate: movie.release_date,
            episode_id: movie.episode_id,
            director: movie.director,
            opening_crawl: movie.opening_crawl,
            id: movie.url.split('/')?.slice(-2)[0],
        }));
        const cacheData = {
            data: filteredMoviesList,
            timestamp: new Date().getTime()
        }
        writeToCache(MOVIES_LIST_URL, cacheData);
        return filteredMoviesList;
    }

}

export const getMovieDetails = async (movieId) => {
    const MOVIE_DETAILS_URL = `${MOVIES_LIST_URL}${movieId}`;
    const cachedData = readFromCache(MOVIE_DETAILS_URL);
    let movieDetailJson = null;

    if (cachedData?.timestamp && compareTime(cachedData?.timestamp)) {
        const data = cachedData.data;
        return data;
    } else {
        const movieDetailResponse = await axios(MOVIE_DETAILS_URL);
        movieDetailJson = await movieDetailResponse.data;


        const cmToInFt = (cm) => {
            const inches = Math.round(cm / 2.54)
            return `(${Math.floor(inches / 12)}ft / ${inches % 12}in)`

        }

        const getTotalHeight = movieDetailJson.characters.map((url) => {
            return axios(url)
                .then((res) => res.data)
                .then(async (char) => (
                    char.height === "unknown" ? 0 : parseInt(char.height)
                ));
        });

        const getCharacters = movieDetailJson.characters.map((url) => {
            return axios(url)
                .then((res) => res.data)
                .then(async (char) => ({
                    name: char.name,
                    gender: char.gender === 'n/a' ? 'A Droid' : `${char.gender}`,
                    height: char.height === 'unknown' ? 'Unknown' : `${char.height}cm ${cmToInFt(char.height)}`,
                }));
        });

        
        const characters = await Promise.all(getCharacters);
        const totalHeightArray = await Promise.all(getTotalHeight)
        const totalHeight = await totalHeightArray.reduce((a, b) => a + b);
        const filteredMovieData = {
            title: movieDetailJson.title,
            director: movieDetailJson.director,
            episodeId: movieDetailJson.episode_id,
            releaseDate: movieDetailJson.release_date,
            characters: characters.sort((a, b) => a.name.localeCompare(b.name)),
            totalHeight,
        }

        const cacheData = {
            data: filteredMovieData,
            timestamp: new Date().getTime()
        }
        writeToCache(MOVIE_DETAILS_URL, cacheData);
        return filteredMovieData;
    }

}