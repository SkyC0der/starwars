import ListMovies from './components/HomePage/ListMovies';
import MovieDetail from './components/MovieDetailPage/MovieDetail';
import Header from './common/components/Header';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/films/:id' element={<MovieDetail />} >
        </Route>
        <Route path='/' element={<ListMovies />} >
        </Route>
      </Routes>
    </div>
  );
}

export default App;
