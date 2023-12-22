// MAIN MODULES
import React, { Component, createRef, useEffect, useState } from "react";
import { connect } from "react-redux";

// COMPONENTS
import Tile from "../../components/Tile";
import { Row, Col } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { findDOMNode } from "react-dom";
// STYLES
import "./styles.scss";

// TYPES
import { State } from "../../reducers";

// ACTIONS
import {
  addUserList,
  setScrollPosition,
  setCarouselPosition,
} from "../../actions";

// SERVISES
import { getFbData, get20Records } from "../../servises/firebase";
import userList from "../../reducers/userList";
import { CircularProgress } from "@material-ui/core";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import Button from "../../components/Buttons";
import { getButtonRed } from "../../components/Buttons/style";

const bc: string = "users_page";

interface ComponentProps {
  list: any[];
  addUserList: any;
  setScrollPosition: any;
  scrollPosition: any;
  setCarouselPosition: any;
  carouselPosition: any;
}
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
let body: any;
const UsersPage = ((props: ComponentProps) => {
  const [cursor, setCursor] = useState(null)
  const [width, setWidth] = useState(window.innerWidth)
  const [loader, setLoader] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const classes = getButtonRed("35px", "220px", '#39a2cf', '14px');
  let carousel: any = createRef();
  const getDataFromFirebase = (() => {
    const triggerUser = props.addUserList;
    setLoader(true)
    get20Records({
      cursor: cursor
    })
      .then((querySnapshot) => {
        const users: any = [];
        querySnapshot.forEach((doc: any) => {
          const newDoc: any = doc.data();
          users.push(newDoc);
        });
        triggerUser([...props.list, ...users]);
        setLoader(false)
        const lastUser = users[users.length - 1]
        setCursor(lastUser)
      })
      .catch((error) => {
        console.log(error.message)
      })
  })
  useEffect(() => {
    getDataFromFirebase();
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    // setTimeout(() => {
    //   if (carousel) {
    //     console.log(carousel, 'carousel position')
    //     carousel.goToSlide(props.carouselPosition);
    //     props.setCarouselPosition(0);
    //   }
    // }, 2200);
  }, [pageNumber])
  useEffect(() => {
    setTimeout(() => {
      const container = document.querySelector("#root>div:first-child");
      container.scrollTo({
        left: 0,
        top: props.scrollPosition,
        behavior: "smooth",
      });
      props.setScrollPosition(0);
    }, 1000);
  }, [])
  const nextPage = () => {
    setPageNumber(pageNumber + 1)
  }
  const breakpoint = 600;

  return <div className={bc}>
    <Header />
    <div className={`${bc}__header`}>
      <div className={`${bc}__header__top_text`}>
        Recently Added Professionals
      </div>
    </div>
    {
      <div ref={(ref) => (body = ref)}>
        <div className={`${bc}__body`}>
          <Row
            className="visible_md"
            style={{ width: "100%" }}
            justify="center"
            gutter={[20, 20]}
          >
            {props.list.map(
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
                return approved ? (
                  <Col>
                    <Tile
                      key={`${id}${first_name}`}
                      fullName={`${first_name} ${last_name}`}
                      workPlace={work_place.join(', ')}
                      //  specialty={specialities.join(' ')}
                      specialty={specialities[specialities.length - 1]}
                      status={prof_title}
                      location={city}
                      workSchedule={working_hours}
                      avatar={avatar}
                      id={id}
                      index={index}
                      video={video}
                    />
                  </Col>
                ) : null;
              }
            )}

          </Row>
          <Carousel
            className="visible_sm"
            responsive={responsive}
            // centerMode={true}
            // beforeChange={this.ButtonGroup}
            // afterChange={this.handleAfterChange}
            ref={(el) => (carousel = el)}
          >
            {props.list.map(
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
                return (
                  approved &&
                  (
                    <Tile
                      key={`${id}${first_name}`}
                      fullName={`${first_name} ${last_name}`}
                      workPlace={work_place.join(', ')}
                      //  specialty={specialities.join(' ')}
                      specialty={specialities[specialities.length - 1]}
                      status={prof_title}
                      location={city}
                      workSchedule={working_hours}
                      avatar={avatar}
                      id={id}
                      index={index}
                      video={video}
                    />

                  )
                );
              }
            )}
          </Carousel>
          {
            loader
              ? <div className={`${bc}__loader`}>
                <CircularProgress />
              </div>
              :
              <div className={`${bc}__body_button`}>
                <Button
                  onClick={nextPage}
                  title='View More Professionals'
                  variant="contained"
                  styles={classes.root}
                />
              </div>
          }
        </div>
      </div>
    }
    <Footer />
  </div>


})
const mapStateToProps = (state: State) => ({
  ...state.userList,
  ...state.app,
  ...state.app.scrollPosition,
});
const mapDispatchToProps = {
  addUserList,
  setScrollPosition,
  setCarouselPosition,
};
export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
