import React from "react";
import "./movie.css";
import MoviesList from "./MoviesList";

export default function Movies(props) {
  //props

  // main return
  return (
    <div className="moviesRow">
      <MoviesList title="Most Recent" {...props} />
      {/* <MoviesList data={streamingData} title="Most Recent" {...props} /> */}
    </div>
  );
}
