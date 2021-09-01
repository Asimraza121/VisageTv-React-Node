import React, { memo } from "react";

//user import

import { api_root_route } from "../../Services/Routes/API";

//component

function LiveTvCard({
  stream_count,
  thumbnail,
  name,
  description,
  stream_location,
  handleOpenModal,
  stream_url,
}) {
  //render

  return (
    <div className="liveTvCard" onClick={() => handleOpenModal(stream_url)}>
      <div className="cardBadge">{stream_count}</div>
      <div className="circle">
        <img
          className="img"
          width={60}
          height={60}
          alt="logo"
          src={`${api_root_route}${thumbnail}`}
        ></img>
      </div>
      <div className="content">
        <div className="title">{name}</div>
        <div className="desc">{description}</div>
        <div className="location">
          <img className="marker mr-2" alt="marker" src="/img/marker.svg"></img>
          <span>{stream_location}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(LiveTvCard);
