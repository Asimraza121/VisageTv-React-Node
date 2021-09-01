import React, { useState } from "react";
import AppContext from "./AppContext";

export default function ContextWrapper(props) {
  const [currentState, setCurrentState] = useState("tv");
  const [activeSideBar, setActiveSideBar] = useState(false);
  const [keyValue, setKeyValue] = useState("all");
  const [selectedUrl, setSelectedUrl] = useState(
    "https://youtu.be/p3GVmp7uzrQ"
  );
  const [streamingData, setStreamingData] = useState([]);

  //render

  return (
    <AppContext.Provider
      value={{
        currentState,
        setCurrentState,
        activeSideBar,
        setActiveSideBar,
        keyValue,
        setKeyValue,
        selectedUrl,
        setSelectedUrl,
        streamingData,
        setStreamingData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
