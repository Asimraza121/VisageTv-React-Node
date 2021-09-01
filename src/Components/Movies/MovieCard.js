import React, { memo } from "react";

//user import

import { api_root_route } from "../../Services/Routes/API";

//component

function MovieCard({ name, thumbnail, stream_url, handleOpenModal }) {
  //render

  return (
    <div
      className="movieCard"
      onClick={() => handleOpenModal(stream_url)}
      style={{
        backgroundImage: `url(${api_root_route}${thumbnail}`,
      }}
    >
      <div className="name">{name}</div>
    </div>
  );
}

export default memo(MovieCard);
