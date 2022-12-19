import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  deleteMovie,
  movieLike,
  movieDislike,
  movieUnlike,
  movieUndislike,
} from "../redux/slices";
import "../styles/Movies.css";
import ThumbsUpFilled from "../icons/like filled.png";
import ThumbsUp from "../icons/like.png";
import ThumbsDownFilled from "../icons/dislike filled.png";
import ThumbsDown from "../icons/dislike.png";
import CrossIcon from "../icons/icons8-cross-24.png";

export const Movies = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movies);
  const [selectedThumbsUp, setSelectedThumbsUp] = useState([]);
  const [selectedThumbsDown, setSelectedThumbsDown] = useState([]);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const like = (id) => {
    let likedIds = [...selectedThumbsUp];

    if (likedIds.includes(id)) {
      likedIds = likedIds.filter((id) => id !== id);
      dispatch(movieUnlike(id));
      setSelectedThumbsUp(likedIds);
      return;
    } else likedIds.push(id);
    dispatch(movieLike(id));
    setSelectedThumbsUp(likedIds);
  };
  
  const dislike = (id) => {
    let dislikedIds = [...selectedThumbsDown];

    if (dislikedIds.includes(id)) {
      dislikedIds = dislikedIds.filter((id) => id !== id);
      dispatch(movieUndislike(id));
      setSelectedThumbsDown(dislikedIds);
      return;
    } else dislikedIds.push(id);
    dispatch(movieDislike(id));
    setSelectedThumbsDown(dislikedIds);
  };

  return (
    <div className="Cards__Container">
      {movieList.loading && <div>Loading</div>}
      {!movieList.loading && movieList.error ? (
        <div>Error : {movieList.error}</div>
      ) : null}
      {!movieList.loading && movieList.movies.length ? (
        <div className="Card__container">
          {movieList.movies.map((movie, index) => (
            <div className="Card" key={movie.id}>
              <img
                src={CrossIcon}
                className={"Delete"}
                onClick={() => dispatch(deleteMovie(movie.id))}
              />
              <div>
                <div style={{ fontWeight: "bold", fontSize: 25 }}>
                  {movie.title}
                </div>
                <div>{movie.category}</div>
              </div>
              <div>
                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    margin: 10,
                  }}
                >
                  Popularity:
                  <span className="bar">
                    <span
                      className="popularity"
                      style={{
                        width:
                          (movie.likes * 100) / (movie.likes + movie.dislikes) +
                          "%",
                      }}
                    ></span>
                  </span>
                </div>
                <div className="Votes">
                  <img
                    src={
                      selectedThumbsDown.includes(index)
                        ? ThumbsDownFilled
                        : ThumbsDown
                    }
                    onClick={() => dislike(index)}
                  />
                  <img
                    src={
                      selectedThumbsUp.includes(index)
                        ? ThumbsUpFilled
                        : ThumbsUp
                    }
                    onClick={() => like(index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
