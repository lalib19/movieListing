import React from "react";
import { Movies } from "../components/Movies";
import { CategoryFilter } from "../components/CategoryFilter";
import { PageFilter } from "../components/PageFilter";
import "../styles/MoviePage.css";

export const MoviePage = () => {
  return (
    <div className="Movies__Container">
      <div className="Filters">
        <CategoryFilter />
        <PageFilter />
      </div>
      <Movies />
    </div>
  );
};
