import React, { useState, useEffect } from "react";
import '../styles/Favourites.css';


function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);
  }, []);

  const removeFromFavourites = (id) => {
    const updatedFavourites = favourites.filter(movie => movie.id !== id);
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  const clearFavourites = () => {
    setFavourites([]);
    localStorage.removeItem("favourites");
  };

  return (
    <div className="movies-container">
      <h1>Избранные фильмы</h1>
      {favourites.length > 0 ? (
        <>
          <button className="clear-all-btn" onClick={clearFavourites}>Очистить все избранное</button>
          <div className="movies-list">
            {favourites.map(movie => (
              <div key={movie.id} className="movie-card">
                <img src={movie.poster} alt={movie.title} className="movie-poster" />
                <h3>{movie.title} ({movie.year})</h3>
                <button className="delete-btn" onClick={() => removeFromFavourites(movie.id)}>Удалить из избранного</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>У вас нет избранных фильмов</p>
      )}
    </div>
  );
}

export default Favourites;
