import { createContext } from "react";

const AppContext = createContext({
  currentState: "tv",
  setCurrentState: (state) => {},
  activeSideBar: false,
  setActiveSideBar: (state) => {},
  keyValue: "featured",
  setKeyValue: (state) => {},
  selectedUrl: "",
  setSelectedUrl: (state) => {},
  streamingData: [],
  setStreamingData: () => {},
});

export default AppContext;
