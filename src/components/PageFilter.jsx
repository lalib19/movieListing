import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../styles/PageFilter.css";
import Select from "react-select";
import { fetchMovies, pageFilter, turnPage } from "../redux/slices";

export const PageFilter = () => {
  const dispatch = useDispatch();
  const [numPages, setNumPages] = useState();

  const options = [
    { value: 4, label: "4" },
    { value: 8, label: "8" },
    { value: 12, label: "12" },
  ];

  async function resetAndFilter(e) {
    await dispatch(fetchMovies());
    dispatch(pageFilter(e));
    setNumPages(e);
  }

  async function nextPage(e) {
    await dispatch(fetchMovies());
    dispatch(turnPage({ number: numPages, page: e }));
  }

  return (
    <div>
      <h4>Number of items per page</h4>
      <Select
        options={options}
        className="Select"
        placeholder="Number of movies"
        onChange={(e) => {
          resetAndFilter(e.value);
        }}
      />
      <div className="PageNumbers">
        {numPages &&
          [...Array(Math.ceil(10 / numPages))].map((e, i) => (
            <button
              key={i}
              value={i + 1}
              onClick={(e) => nextPage(e.target.value)}
            >
              {i + 1}
            </button>
          ))}
      </div>
    </div>
  );
};
