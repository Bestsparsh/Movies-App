import React from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Movie from "./pages/Movie"
import Header from './component/Header';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>

        <Route path="/movie/:id" element={<Movie />}/>

        <Route path="/Favorites" element={<Favorites />}/>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
