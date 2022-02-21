import axios from 'axios'
const MOVIES_LIST_URL = 'https://swapi.dev/api/films/';
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

        const getHomeWorld = (url) => {
            const cachedData = readFromCache(url);
            if (cachedData?.timestamp && compareTime(cachedData?.timestamp)) {
                const data = cachedData.data;
                return data;
            }
            return axios(url)
                .then((res) => res.data)
                .then((home) => home.name);
        }

        const getCharacters = movieDetailJson.characters.map((url) => {
            return axios(url)
                .then((res) => res.data)
                .then(async (char) => ({
                    name: char.name,
                    mass: char.mass === 'unknown' ? 'Unknown' : `${char.mass}kg`,
                    height: char.height === 'unknown' ? 'Unknown' : `${char.height}cm`,
                    homeworld: await getHomeWorld(char.homeworld),
                }));
        });

        const speciesCount = {};
        const getSpecies = movieDetailJson.species.map((url) => {
            return axios(url)
                .then((res) => res.data)
                .then(s => {
                    const classification = s.classification;
                    speciesCount[classification] ? speciesCount[classification]++ : speciesCount[classification] = 1;
                    return s;
                });
        })

        const characters = await Promise.all(getCharacters);
        const species = await Promise.all(getSpecies);
        const filteredMovieData = {
            title: movieDetailJson.title,
            director: movieDetailJson.director,
            episodeId: movieDetailJson.episode_id,
            releaseDate: movieDetailJson.release_date,
            characters : characters.sort( (a, b) => a.name.localeCompare(b.name)),
            species,
            speciesCount,
        }

        const cacheData = {
            data: filteredMovieData,
            timestamp: new Date().getTime()
        }
        writeToCache(MOVIE_DETAILS_URL, cacheData);
        return filteredMovieData;
    }

}