import useListMovies from "../../layout/hooks/useListMovies";
import ListMovieItem from "./../HomePage/ListMovieItem";
import Loader from '../../layout/components/Loader'
import { Row, Container, Accordion } from 'react-bootstrap';
import useMovieDetails from "../../layout/hooks/useMovieDetail";
import DisplayMovieData from "../MovieDetailPage/DisplayMovieData";
import { useState } from "react";


export default function ListMovies() {
  const [activeid, setActiveId] = useState("")
  const [query, setQuery] = useState(1)
  let { loading, moviesList } = useListMovies();
  let { loading2, movieDetails, characters, setCharacters, sortingDirections, setSortingDirections } = useMovieDetails(query);
  
  // console.log(moviesList)
  // function fetch(){
  //   useMovieDetails(query)
  //   return { loading2, movieDetails, characters, setCharacters, sortingDirections, setSortingDirections }
  // }
  // console.log(characters)
  function changes(x) {
    console.log(x)
    // if (x !== 1){setActiveId(parseInt(x) + 1)}
    setActiveId(x)
    
    setQuery((prev) =>{
      if (x === null && prev !== 1){
       return prev 
      }
      prev = x + 1
      console.log(prev)
      return prev
    } )
    // if (x){setQuery(x+1)}
    
    // console.log(activeid)
  }
  // console.log(query)
  return (
    <Container>
      <Row>
        {loading ? (
          <Loader />
        ) : (
          moviesList.map((movie, index) => (

            <Accordion flush key={index} activeKey={activeid} onSelect={changes}>
              <Accordion.Item eventKey={index} >
                <Accordion.Header>
                  <ListMovieItem
                  key={movie.episode_id}
                  releaseDate={movie.releaseDate}
                  title={movie.title}
                  director={movie.director}
                  episodeId={movie.episode_id}
                  id={movie.id}
                /></Accordion.Header>
                <Accordion.Body>
                  {loading2 ? (
                    <Loader />
                  ) : (
                    <div>

                      <DisplayMovieData
                        title={movieDetails.title}
                        director={movieDetails.director}
                        openingCrawl={movie.opening_crawl}
                        episodeId={movieDetails.episodeId}
                        releaseDate={movieDetails.releaseDate}
                        totalHeight={movieDetails.totalHeight}
                        characters={characters}
                        setCharacters={setCharacters}
                        sortingDirections={sortingDirections}
                        setSortingDirections={setSortingDirections}
                      />
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>

            </Accordion>
          ))
        )}
      </Row>
    </Container>
  )
}