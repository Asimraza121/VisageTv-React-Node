import React, { useContext, useState, useEffect } from "react";

//package import

import { Link } from "react-router-dom";

//user import

import "./Sidebar.css";
import FeaturedIcon from "../../assets/images/featuredIcon";
import ComingSoonIcon from "../../assets/images/comingSoonIcon";
import EntertainmentIcon from "../../assets/images/entertainmentIcon";
import NewsIcon from "../../assets/images/newsIcon";
import RealityIcon from "../../assets/images/realityIcon";
import TvIcon from "../../assets/images/tvIcon";
import AppContext from "../../context/AppContext";
import { root_routes } from "../../Services/Routes/APP";

//constants

const data = [
  { name: "All", img: FeaturedIcon, key_value: "all" },
  { name: "Featured", img: FeaturedIcon, key_value: "featured" },
  { name: "Movies", img: TvIcon, key_value: "movies" },
  { name: "Coming soon", img: ComingSoonIcon, key_value: "coming_soon" },
  {
    name: "Entertainment",
    img: EntertainmentIcon,
    key_value: "entertainment",
  },
  { name: "News+Opinion", img: NewsIcon, key_value: "news_or_opinion" },
  { name: "Reality", img: RealityIcon, key_value: "reality" },
];

//component

export default function Sidebar() {
  //hooks

  const {
    activeSideBar,
    setActiveSideBar,
    currentState,
    setCurrentState,
    keyValue,
    setKeyValue,
  } = useContext(AppContext);

  //   make component
  const makeComponent = (Component, isActive) => {
    const color1 = "#fff";
    const color2 = "#808191";
    return <Component color={isActive ? color1 : color2} />;
  };

  //   main return
  return (
    <>
      <div className="sideBar d-none d-md-block">
        <div className="innerSideBar">
          {data?.map((item, index) => {
            const isActive = item.key_value === keyValue;
            return (
              <div
                key={`${item?.name}-dsdjskdpo-${index}`}
                onClick={() => setKeyValue(item?.key_value)}
                className={isActive ? "item itemActive" : "item"}
              >
                <div className="circle">
                  {makeComponent(item.img, isActive)}
                </div>
                <div>{item.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="d-block d-md-none">
        <div
          onClick={() => setActiveSideBar(false)}
          className={
            activeSideBar ? "sideBarModal sideBarModalActive" : "sideBarModal"
          }
        ></div>
        <div
          className={
            activeSideBar
              ? "sideBar sideBarM  sideBarMActive"
              : "sideBar sideBarM "
          }
        >
          <div className="search_bar w-100 my-3 ">
            <input
              className="input-text"
              id="Name"
              name="Name"
              placeholder="Search"
              type=""
              autoComplete=""
            />
            <img
              className="searchimg pointer"
              src="/img/search.svg"
              style={{ right: "10px", top: "8px" }}
            />
          </div>
          <Link to={root_routes?.root}>
            <div className="twobtn centerFlex mb-3">
              <button
                onClick={() => {
                  setCurrentState("tv");
                  setActiveSideBar(false);
                }}
                className={
                  currentState === "tv"
                    ? "headerButton tv headerButtonActive"
                    : "headerButton tv"
                }
                style={{ padding: "6px 24px" }}
              >
                Live Tv
              </button>
              <button
                onClick={() => {
                  setCurrentState("movie");
                  setActiveSideBar(false);
                }}
                className={
                  currentState === "movie"
                    ? "headerButton  headerButtonActive"
                    : "headerButton"
                }
                style={{ padding: "6px 24px" }}
              >
                Movies
              </button>
            </div>
          </Link>

          <div className="innerSideBar">
            {data.map((item, index) => {
              const isActive = item.key_value === keyValue;
              return (
                <div
                  key={`${index}`}
                  onClick={() => {
                    setKeyValue(item.key_value);
                    setActiveSideBar(false);
                  }}
                  className={isActive ? "item itemActive" : "item"}
                >
                  <div className="circle">
                    {makeComponent(item.img, isActive)}
                  </div>
                  <div>{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
