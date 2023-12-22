// MAIN MODULES
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// COMPONENTS
import Button from "../../components/Buttons";
import Tile from "../../components/Tile";

// STYLES
import "./styles.scss";
import { getStyles } from "../../components/Buttons/style";

// TYPES
import { State } from "../../reducers";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import { getItemToLocalStorage, setItemToLocalStorage } from "../../servises/localStorage";
import { CircularProgress } from "@material-ui/core";
import { base_URL } from "../../servises/firebase";

interface ComponentProps {
  list: any;
  history: History;
}

const bc: string = "professional-new";
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
const NewProfessionals = ({ list, history }: ComponentProps) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [listLoad, setListLoad] = useState(false);
  const breakpoint = 600;


  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const classes = getStyles();
  const [val, setVal] = useState([]);
  const redirect = (): void => {
     history.push("/professionals");
   };

  useEffect(() => {
    // console.log("=============\n", `${base_URL}/GetHomepageData`, "=============\n",)
  
    setListLoad(true);
    const localList = getItemToLocalStorage("usersList");
    if (localList) {
      setVal(localList);
    }
    else {
      // tslint:disable-next-line: one-variable-per-declaration

       fetch(`${base_URL}/GetHomepageData`)  // Home page lists call
        .then(response => response.json())
        .then(data => {
          if (data) {
            // 5 cities => data[0]
            setItemToLocalStorage("citiesList", data[0]);

            // 5 org => data[1]
            setItemToLocalStorage("orgList", data[1]);

            // 5 professionals (users) => data[2]
            setItemToLocalStorage("usersList", data[2]);
            setVal(data[2]);
          }
        })
      setListLoad(false);
    }
    setListLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);



  return (
    <div className={bc}>
      <div className={`${bc}__header`}>
        <div className={`${bc}__header__header-title`}>Pediatric Professionals</div>
        <Button title={"View All Professionals"} styles={classes.root} onClick={redirect} />
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
            gutter={40}
            >
            {val.map(
              (
                {
                  first_name,
                  last_name,
                  work_place,
                  prof_title,
                  city,
                  working_hours,
                  avatar,
                  id,
                  specialities,
                  approved,
                  video,
                }: any,
                index: number
              ) => {
                if (index > 4) return undefined;
                return (
                  approved && (
                    <Col
                      xs={{ span: 20, offset: 2 }}
                      sm={{ span: 10, offset: 1 }}
                      md={{ span: 10, offset: 1 }}
                      lg={{ span: 6, offset: 0 }}
                      xl={{ span: 4, offset: 0 }}
                      xxl={{ span: 4, offset: 0 }}
                      key={index}
                    >
                      <Tile
                        key={`${id}${first_name}`}
                        fullName={`${first_name} ${last_name}`}
                        workPlace={work_place.join(', ')}
                        specialty={specialities[specialities.length - 1]}
                        status={prof_title}
                        location={city}
                        workSchedule={working_hours}
                        avatar={avatar}
                        id={id}
                        video={video}
                      // index={index}
                      />
                    </Col>
                  )
                );
              }
            )}
          </Row>
          <Carousel className="visible_sm" responsive={responsive}>
            {val
              .slice(0, 5)
              .map(
                (
                  {
                    first_name,
                    last_name,
                    work_place,
                    prof_title,
                    city,
                    working_hours,
                    avatar,
                    id,
                    specialities,
                    approved,
                    video,
                  }: any,
                  // index: number
                ) => {
                  return (
                    approved && (
                      <Tile
                        key={`${id}${first_name}`}
                        fullName={`${first_name} ${last_name}`}
                        workPlace={work_place.join(', ')}
                        specialty={specialities[specialities.length - 1]}
                        status={prof_title}
                        location={city}
                        workSchedule={working_hours}
                        avatar={avatar}
                        id={id}
                        video={video}
                      />
                    )
                  );
                }
              )}
          </Carousel>
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  ...state.userList,
  ...state.app,
});

export default compose<ComponentProps, {}>(
  withRouter,
  connect(mapStateToProps)
)(NewProfessionals);
