import React, { useEffect, useState } from "react";
import "../styles/CategoryFilter.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { filterMovie } from "../redux/slices";

export const CategoryFilter = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movies);
  const [categories, setCategories] = useState([]);

  const extractCategories = () => {
    const array = [];
    movieList.movies.map((el) => {
      array.push(el.category);
    });
    const newCategories = [...new Set(array)];

    const newArray = [];
    newCategories.map((el) => {
      newArray.push({ value: el, label: el });
    });
    setCategories(newArray);
  };

  useEffect(() => {
    extractCategories();
  }, [movieList.movies]);

  return (
    <div className="Filter__Container">
      <div className="Multiselect">
      <h4>Filter by category</h4>
        {movieList.loading && <div>Loading</div>}
        {!movieList.loading && movieList.error ? (
          <div>Error : {movieList.error}</div>
        ) : null}
        {!movieList.loading &&
        movieList.movies.length &&
        categories.length > 0 ? (
          <Select
            options={categories}
            className="Select"
            onChange={(e) => dispatch(filterMovie(e.value))}
            placeholder="Category"
          />
        ) : null}
      </div>
    </div>
  );
};
