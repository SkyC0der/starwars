import ListMovies from './components/HomePage/ListMovies';
import Header from './layout/components/Header';
import { Routes, Route } from 'react-router-dom';
import './styles.scss'
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
       
        <Route path='/' element={<ListMovies />} >
        </Route>
      </Routes>
    </div>
  );
}

export default App;
