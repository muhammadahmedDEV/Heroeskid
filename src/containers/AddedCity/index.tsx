// MAIN MODULES
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import { Row, Col } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// COMPONENTS
import Button from "../../components/Buttons";
import CityTile from "../../components/CityTile";

// STYLES
import "./styles.scss";
import { getStyles } from "../../components/Buttons/style";

// TYPES
import { State } from "../../reducers";
import { getItemToLocalStorage, setItemToLocalStorage } from "../../servises/localStorage";
import { base_URL } from "../../servises/firebase";
import { CircularProgress } from "@material-ui/core";

interface ComponentProps {
  cityList: any[];
  history: History;
}

const bc: string = "added-city";
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
const AddedCity = ({ cityList, history }: ComponentProps) => {
  const [sortedList, setSortedList] = useState([]);
  const [listLoad, setListLoad] = useState(false);
  const classes = getStyles();
  useEffect(() => {
    setListLoad(true);
    const citiesList = getItemToLocalStorage("citiesList");
    if (citiesList) {
      const sortedCities =
        citiesList &&
        citiesList.sort(function (a: any, b: any) {
          return b.member_count - a.member_count;
        });
      setSortedList(sortedCities);
    }
    else {
      fetch(`${base_URL}/GetHomepageData`)  // Home page lists call
        .then(response => response.json())
        .then(data => {
          if (data) {
            // 5 cities => data[0]
            setItemToLocalStorage("citiesList", data[0]);
            const sortedCities =
              data[0] &&
              data[0].sort(function (a: any, b: any) {
                return b.member_count - a.member_count;
              });
            setSortedList(sortedCities);

          }
        })
      setListLoad(false);
    }
    setListLoad(false);
  }, []);
  const trigger = () => {
    history.push("/city");
  };
  return (
    <div className={bc}>
      <div className={`${bc}__header`}>
        <div className={`${bc}__header__top_text`}>Recently Added Cities</div>
        <Button
          title={"View All Cities"}
          styles={classes.root}
          onClick={trigger}
        />
      </div>
      {listLoad == true ?
        <div className={`${bc}__loader`}>
          <CircularProgress />
        </div> :
        <div className={`${bc}__body`}>
          <Row
            className="visible_md"
            style={{ width: "100%" }}
            justify="space-between"
          >
            {sortedList.map(
              (
                { name, photo, member_count, description, disabled, id }: any,
                index: number
              ) => {
                if (index > 4) return undefined;
                return (
                  <Col
                    xs={{ span: 20, offset: 2 }}
                    sm={{ span: 10, offset: 2 }}
                    md={{ span: 10, offset: 2 }}
                    lg={{ span: 4, offset: 0 }}
                    xl={{ span: 4, offset: 0 }}
                    xxl={{ span: 4, offset: 0 }}
                    key={index}
                  >
                    <CityTile
                      key={`${id}${name}`}
                      cityName={name}
                      url={photo}
                      like={member_count}
                      specialty={description}
                      disabled={!member_count ? true : false}
                      history={history}
                    />
                  </Col>
                );
              }
            )}
          </Row>
          <Carousel className="visible_sm" responsive={responsive}>
            {sortedList
              .slice(0, 5)
              .map(
                (
                  { name, photo, member_count, description, disabled, id }: any,
                  index: number
                ) => {
                  if (index > 4) return undefined;
                  return (
                    <CityTile
                      key={`${id}${name}`}
                      cityName={name}
                      url={photo}
                      like={member_count}
                      specialty={description}
                      disabled={!member_count ? true : false}
                      history={history}
                    />
                  );
                }
              )}
          </Carousel>
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state: State) => state.app;

export default compose<ComponentProps, {}>(
  withRouter,
  connect(mapStateToProps)
)(AddedCity);
