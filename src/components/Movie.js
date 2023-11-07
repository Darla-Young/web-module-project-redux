import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteMovie } from '../actions/movieActions';
import { addFavorite } from '../actions/favoritesActions';

const Movie = (props) => {
 const { id } = useParams();
 const { push } = useHistory();
 const { movies, favorites, displayFavorites, deleteMovie, addFavorite } = props;
 const movie = movies.find(movie=>movie.id===Number(id));
 const [buttonDisplay, setButtonDisplay] = useState(!favorites.includes(movie));

 const onFavClick = () => {
  addFavorite(movie);
  setButtonDisplay(false);
 }

 const onDelClick = () => {
  deleteMovie(movie.id);
  push('/movies');
 }

 return(
  <div className="modal-page col">
   <div className="modal-dialog">
    <div className="modal-content">
     <div className="modal-header">						
      <h4 className="modal-title">{movie.title} Details</h4>
     </div>
     <div className="modal-body">
      <div className="flexContainer">

       <section className="movie-details">
        <div>
         <label>Title: <strong>{movie.title}</strong></label>
        </div>
        <div>
         <label>Director: <strong>{movie.director}</strong></label>
        </div>
        <div>
         <label>Genre: <strong>{movie.genre}</strong></label>
        </div>
        <div>
         <label>Metascore: <strong>{movie.metascore}</strong></label>
        </div>
        <div>
         <label>Description:</label>
         <p><strong>{movie.description}</strong></p>
        </div>
       </section>
       
       <section>
        {displayFavorites && buttonDisplay ? <span onClick={onFavClick} className="m-2 btn btn-dark">Favorite</span> : null}
        
        <span className="delete">
         <input type="button" onClick={onDelClick} className="m-2 btn btn-danger" value="Delete"/>
        </span>
       </section>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}

const mapStateToProps = (state) => {
 return ({
  movies: state.movieReducer.movies,
  favorites: state.favoriteReducer.favorites,
  displayFavorites: state.favoriteReducer.displayFavorites
 })
}

export default connect(mapStateToProps,{deleteMovie, addFavorite})(Movie);