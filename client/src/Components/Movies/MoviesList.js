import React, { useContext } from "react";

//package import

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

//user import

import MovieCard from "./MovieCard";
import AppContext from "../../context/AppContext";

//component

export default function MoviesList(props) {
  const { data, title } = props;

  //context

  const { setSelectedUrl, streamingData } = useContext(AppContext);

  // responseive config
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const handleOpenModal = (url) => {
    setSelectedUrl(url);
  };

  //  main retrun
  return (
    <div>
      <div className="flexBetweenCenter">
        <div className="secTitle">{title}</div>
        <div className="linkText mr-0 mr-md-5">See All</div>
      </div>
      <Carousel
        // swipeable={false}
        // draggable={false}
        // showDots={true}
        responsive={responsive}
        // infinite={true}
        autoPlay={true}
        // autoPlaySpeed={1000}
        // keyBoardControl={true}
        // customTransition="all .5"
        draggable={true}
        transitionDuration={300}
        containerClass="movieSliderContainer"
        // customLeftArrow={<CustomLeftArrow />}
        // customRightArrow={<CustomRightArrow />}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        // dotListClass="custom-dot-list-style"
        //   itemClass="centerFlex"
      >
        {streamingData?.map((item, index) => (
          <MovieCard
            key={`${index}-asdasd-${item?._id}`}
            {...item}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </Carousel>
    </div>
  );
}
