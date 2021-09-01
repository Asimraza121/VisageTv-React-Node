import React, { useContext } from "react";

//user import

import "./Livetv.css";
import LiveTvCard from "./LiveTvCard";
import AppContext from "../../context/AppContext";

//component

export default function LiveTv({}) {
  //states

  // context

  const { setSelectedUrl, streamingData } = useContext(AppContext);

  //states

  const handleOpenModal = (url) => {
    setSelectedUrl(url);
  };

  // main return
  return (
    <div className="liveTvRow liveTV">
      <div className="secTitle">Live TV</div>
      <div className="tvCardFlex">
        {streamingData?.map((item, index) => {
          return (
            <LiveTvCard
              key={`${index}-${item?.name}`}
              {...item}
              handleOpenModal={handleOpenModal}
            />
          );
        })}
      </div>
    </div>
  );
}
