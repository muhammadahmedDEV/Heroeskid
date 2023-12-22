// MAIN MODULES
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import { Row, Col } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// COMPONENTS
// import Button from "../../components/Button";
import CityTile from "../../components/CityTile";

// STYLES
import "./styles.scss";
import { getStyles } from "../../components/Buttons/style";

// TYPES
import { State } from "../../reducers";
import { CircularProgress } from "@material-ui/core";
import { setScrollPosition, setCarouselPosition, addCityList } from "../../actions";
import { Console } from "console";
import Footer from "../../containers/Footer";
import Header from "../../containers/Header";
import { getFbData } from "../../servises/firebase";

interface ComponentProps {
  cityList: any[];
  history: History;
  scrollPosition: any;
  setScrollPosition: (a: any) => void;
  carouselPosition: any;
  setCarouselPosition: (a: any) => void;
  addCityList: any
}

const bc: string = "city_page";
const responsive = {
  tablet: {
    breakpoint: { max: 992, min: 600 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const AddedCity = ({
  cityList,
  history,
  scrollPosition,
  carouselPosition,
  setCarouselPosition,
  setScrollPosition,
  addCityList
}: ComponentProps) => {
  //   const trigger = () => {
  //     history.push("/city");
  //   };
  let carousel: any = useRef();
  const [carouselPointer, setCarouselPointer] = useState(carouselPosition);
  const [loader, setLoader] = useState(false);
  const [sortedCities, setSortedCities] = useState([]);

  useEffect(() => {
    if (cityList.length === 0) {
      setLoader(true)
      getFbData("cities")
        .then((querySnapshot) => {
          const cities: any = [];
          querySnapshot.forEach((doc: any) => {
            cities.push(doc.data());
          });

          const sortCities =
            cities &&
            cities.sort(function (a: any, b: any) {
              const textA = a.name && a.name.toUpperCase();
              const textB = b.name && b.name.toUpperCase();
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            });
          setSortedCities(sortCities)
          addCityList(sortCities)
          if (cityList.length > 0) {
            setLoader(false)
          }
        })
        .catch((e) => {
          // Error stored in  state
          // setError(e)
          console.log(e, 'error')
        });
    } else {
      setSortedCities(cityList)
      setLoader(false)
    }
    setTimeout(() => {
      const container = document.querySelector("#root>div:first-child");
      container.scrollTo({
        left: 0,
        top: scrollPosition,
        behavior: "smooth",
      });
      setScrollPosition(0);
    }, 1000);

    setTimeout(() => {
      if (carousel) {
        carousel && carousel.goToSlide(carouselPointer);
        setCarouselPosition(0);
      }
    }, 2200);
  }, [cityList]);

  return <div className={bc}>
    <Header />
    <div className={`${bc}__header`}>
      <div className={`${bc}__header__top_text`}>Recently Added Cities</div>
    </div>
    {
      loader ? (
        <div className={`${bc}__loader`}>
          <CircularProgress />
        </div>
      ) :
        <div className={`${bc}__body`}>
          <Row
            className="visible_md"
            style={{ width: "100%" }}
            justify="center"
            gutter={[20, 20]}
          >
            {sortedCities.map(
              (
                { name, photo, member_count, description, disabled, id }: any,
                index: number
              ) => {
                //   if (index > 4) return undefined;
                return (
                  <Col
                  // xs={{ span: 20, offset: 1 }}
                  // sm={{ span: 10, offset: 1 }}
                  // md={{ span: 10, offset: 1 }}
                  // lg={{ span: 5, offset: 0 }}
                  // xl={{ span: 5, offset: 0 }}
                  // xxl={{ span: 5, offset: 0 }}
                  >
                    <CityTile
                      key={`${id}${name}`}
                      cityName={name}
                      url={photo}
                      like={member_count}
                      specialty={description}
                      disabled={!member_count ? true : false}
                      history={history}
                      index={index}
                    />
                  </Col>
                );
              }
            )}
          </Row>
          <Carousel
            className="visible_sm"
            responsive={responsive}
            ref={(el) => (carousel = el)}
          // afterChange={handleAfterChange}
          >
            {sortedCities.map(
              (
                { name, photo, member_count, description, disabled, id }: any,
                index: number
              ) => {
                // if (index > 4) return undefined;
                return (
                  <CityTile
                    key={`${id}${name}`}
                    cityName={name}
                    url={photo}
                    like={member_count}
                    specialty={description}
                    disabled={!member_count ? true : false}
                    history={history}
                    index={index}
                  />
                );
              }
            )}
          </Carousel>
        </div>
    }
    <Footer />
  </div>
};

const mapStateToProps = (state: State) => state.app;
const mapDispatchToProps = { setScrollPosition, setCarouselPosition, addCityList };
export default compose<ComponentProps, {}>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AddedCity);
